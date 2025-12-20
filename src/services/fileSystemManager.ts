import { Logger } from '../utils/logger';

export interface FileSystemConfig {
  baseDir: string;
  channels: string[];
  languages: string[];
  platforms: string[];
}

export interface ProfileNaming {
  channel: string;
  language: string;
  platform: string;
  date: string;
  filename: string;
  fullPath: string;
}

export class FileSystemManager {
  private logger: Logger;
  private config: FileSystemConfig;
  private directories = {
    input: 'input_videos',
    logos: 'logos',
    audios: 'audios',
    output: 'output'
  };

  constructor(config: FileSystemConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  /**
   * Create directory structure for 660 profiles
   * Folders:
   * - input_videos/
   * - logos/ (kanal-specific)
   * - audios/ (language-specific)
   * - output/ (platform + language organized)
   */
  async initializeDirectories(): Promise<void> {
    await this.logger.info('fileSystem', 'Initializing directory structure', {
      baseDir: this.config.baseDir,
      totalProfiles: this.config.channels.length * this.config.languages.length * this.config.platforms.length
    });

    try {
      // Create main directories
      const mainDirs = [
        `${this.config.baseDir}/${this.directories.input}`,
        `${this.config.baseDir}/${this.directories.logos}`,
        `${this.config.baseDir}/${this.directories.audios}`,
        `${this.config.baseDir}/${this.directories.output}`
      ];

      for (const dir of mainDirs) {
        await this.createDirectory(dir);
      }

      // Create channel-specific directories
      for (const channel of this.config.channels) {
        await this.createDirectory(`${this.config.baseDir}/${this.directories.logos}/${channel}`);
      }

      // Create language-specific directories
      for (const lang of this.config.languages) {
        await this.createDirectory(`${this.config.baseDir}/${this.directories.audios}/${lang}`);
      }

      // Create output directories (platform × language)
      for (const platform of this.config.platforms) {
        for (const lang of this.config.languages) {
          await this.createDirectory(`${this.config.baseDir}/${this.directories.output}/${platform}/${lang}`);
        }
      }

      await this.logger.info('fileSystem', 'Directory structure initialized successfully');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('fileSystem', 'Directory initialization failed', { error: errorMessage });
      throw error;
    }
  }

  /**
   * Generate filename for 660 profiles
   * Format: {Channel}_{Language}_{Platform}_{YYYYMMDD_HHMMSS}.mp4
   * Example: Rabbit_English_YouTube_20250220_143022.mp4
   */
  generateProfilePath(
    channel: string,
    language: string,
    platform: string,
    videoNumber: number = 1
  ): ProfileNaming {
    const now = new Date();
    const dateStr = now.toISOString().replace(/[-:T.]/g, '').substring(0, 15); // YYYYMMDD_HHMMSS

    const filename = `${channel}_${language}_${platform}_${dateStr}_v${videoNumber}.mp4`;
    const fullPath = `${this.config.baseDir}/${this.directories.output}/${platform}/${language}/${filename}`;

    return {
      channel,
      language,
      platform,
      date: dateStr,
      filename,
      fullPath
    };
  }

  /**
   * Get input video path
   */
  getInputPath(filename: string): string {
    return `${this.config.baseDir}/${this.directories.input}/${filename}`;
  }

  /**
   * Get logo path for specific channel
   */
  getLogoPath(channel: string, logoFilename: string): string {
    return `${this.config.baseDir}/${this.directories.logos}/${channel}/${logoFilename}`;
  }

  /**
   * Get audio path for specific language
   */
  getAudioPath(language: string, audioFilename: string): string {
    return `${this.config.baseDir}/${this.directories.audios}/${language}/${audioFilename}`;
  }

  /**
   * Get output path (processed video)
   */
  getOutputPath(
    platform: string,
    language: string,
    filename: string
  ): string {
    return `${this.config.baseDir}/${this.directories.output}/${platform}/${language}/${filename}`;
  }

  /**
   * List all profiles from output directory
   */
  async listProcessedVideos(platform?: string, language?: string): Promise<ProfileNaming[]> {
    const profiles: ProfileNaming[] = [];

    try {
      // In real implementation, use fs.readdirSync or cloud storage API
      for (const channel of this.config.channels) {
        for (const lang of this.config.languages) {
          for (const plat of this.config.platforms) {
            if ((platform && plat !== platform) || (language && lang !== language)) {
              continue;
            }
            
            const profile = this.generateProfilePath(channel, lang, plat);
            profiles.push(profile);
          }
        }
      }

      await this.logger.info('fileSystem', 'Listed processed videos', {
        count: profiles.length,
        filter: { platform, language }
      });

      return profiles;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('fileSystem', 'Failed to list videos', { error: errorMessage });
      return [];
    }
  }

  private async createDirectory(path: string): Promise<void> {
    // Simulation - real implementation would use fs or cloud storage
    await this.logger.debug('fileSystem', `Created directory: ${path}`);
  }
}
