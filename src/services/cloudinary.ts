import { Logger } from '../utils/logger';

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

export interface CloudinaryUploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

export class CloudinaryService {
  private config: CloudinaryConfig;
  private logger: Logger;

  constructor(config: CloudinaryConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  private generateSignature(params: Record<string, string>, timestamp: number): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    const stringToSign = `${sortedParams}&timestamp=${timestamp}${this.config.apiSecret}`;
    return this.sha1(stringToSign);
  }

  private sha1(str: string): string {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    let hash = 0x67452301;
    let h1 = 0xEFCDAB89;
    let h2 = 0x98BADCFE;
    let h3 = 0x10325476;
    let h4 = 0xC3D2E1F0;
    
    return Array.from(data).reduce((acc, byte) => {
      return acc + byte.toString(16).padStart(2, '0');
    }, '').substring(0, 40);
  }

  async uploadFromUrl(videoUrl: string): Promise<CloudinaryUploadResult> {
    await this.logger.info('cloudinary', 'Starting upload from URL', { videoUrl });
    
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const params = {
        resource_type: 'video',
        folder: 'ai-video-uploader'
      };

      const formData = new FormData();
      formData.append('file', videoUrl);
      formData.append('upload_preset', 'ai_video_upload');
      formData.append('resource_type', 'video');
      formData.append('folder', 'ai-video-uploader');
      formData.append('api_key', this.config.apiKey);
      formData.append('timestamp', timestamp.toString());

      const uploadUrl = `https://api.cloudinary.com/v1_1/${this.config.cloudName}/video/upload`;
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        await this.logger.error('cloudinary', 'Upload failed', { status: response.status, error: errorText });
        return { success: false, error: errorText };
      }

      const result = await response.json() as { secure_url: string; public_id: string };
      
      await this.logger.info('cloudinary', 'Upload successful', { 
        url: result.secure_url, 
        publicId: result.public_id 
      });

      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('cloudinary', 'Upload exception', { error: errorMessage });
      return { success: false, error: errorMessage };
    }
  }

  async uploadFromFile(fileBuffer: ArrayBuffer, filename: string): Promise<CloudinaryUploadResult> {
    await this.logger.info('cloudinary', 'Starting upload from file', { filename });
    
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const blob = new Blob([fileBuffer], { type: 'video/mp4' });
      
      const formData = new FormData();
      formData.append('file', blob, filename);
      formData.append('upload_preset', 'ai_video_upload');
      formData.append('resource_type', 'video');
      formData.append('folder', 'ai-video-uploader');
      formData.append('api_key', this.config.apiKey);
      formData.append('timestamp', timestamp.toString());

      const uploadUrl = `https://api.cloudinary.com/v1_1/${this.config.cloudName}/video/upload`;
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        await this.logger.error('cloudinary', 'File upload failed', { status: response.status, error: errorText });
        return { success: false, error: errorText };
      }

      const result = await response.json() as { secure_url: string; public_id: string };
      
      await this.logger.info('cloudinary', 'File upload successful', { 
        url: result.secure_url, 
        publicId: result.public_id 
      });

      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('cloudinary', 'File upload exception', { error: errorMessage });
      return { success: false, error: errorMessage };
    }
  }
}
