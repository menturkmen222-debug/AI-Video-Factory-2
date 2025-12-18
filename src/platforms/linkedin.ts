import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface LinkedInConfig {
  accessToken: string;
  organizationId?: string;
  personId?: string;
}

export class LinkedInUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('linkedin', credentials, logger);
  }

  async validateCredentials(): Promise<boolean> {
    if (!this.credentials.accessToken) {
      return false;
    }
    return true;
  }

  async upload(videoUrl: string, metadata: PlatformMetadata, channelId: string): Promise<UploadResult> {
    await this.logUploadStart(channelId, metadata.title);

    try {
      if (!await this.validateCredentials()) {
        return createUploadResult(false, { error: 'Invalid LinkedIn credentials' });
      }

      const videoBlob = await this.fetchVideo(videoUrl);
      const description = this.truncateDescription(metadata.description);
      const hashtags = this.formatHashtags(metadata.hashtags);
      const commentary = `${description}\n\n${hashtags.join(' ')}`;

      const registerResponse = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify({
          registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-video'],
            owner: `urn:li:person:${this.credentials.userId}`,
            serviceRelationships: [{
              relationshipType: 'OWNER',
              identifier: 'urn:li:userGeneratedContent'
            }]
          }
        })
      });

      if (!registerResponse.ok) {
        const error = await registerResponse.text();
        return createUploadResult(false, { 
          error: `LinkedIn register upload failed: ${error}`,
          errorCode: registerResponse.status.toString()
        });
      }

      const registerResult = await registerResponse.json() as {
        value: {
          uploadMechanism: { 'com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest': { uploadUrl: string } };
          asset: string;
        };
      };

      const uploadUrl = registerResult.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
      const asset = registerResult.value.asset;

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/octet-stream'
        },
        body: videoBlob
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.text();
        return createUploadResult(false, { 
          error: `LinkedIn video upload failed: ${error}`,
          errorCode: uploadResponse.status.toString()
        });
      }

      const shareResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify({
          author: `urn:li:person:${this.credentials.userId}`,
          lifecycleState: 'PUBLISHED',
          specificContent: {
            'com.linkedin.ugc.ShareContent': {
              shareCommentary: { text: commentary },
              shareMediaCategory: 'VIDEO',
              media: [{
                status: 'READY',
                media: asset,
                title: { text: metadata.title }
              }]
            }
          },
          visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
        })
      });

      if (!shareResponse.ok) {
        const error = await shareResponse.text();
        return createUploadResult(false, { 
          error: `LinkedIn share post failed: ${error}`,
          errorCode: shareResponse.status.toString()
        });
      }

      const shareResult = await shareResponse.json() as { id: string };
      const postId = shareResult.id.split(':').pop() || shareResult.id;
      const postUrl = `https://www.linkedin.com/feed/update/${shareResult.id}`;

      await this.logUploadSuccess(postId, postUrl);
      return createUploadResult(true, { videoId: postId, url: postUrl });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
