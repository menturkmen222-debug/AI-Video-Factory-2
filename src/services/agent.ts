import { Logger } from '../utils/logger';
import { GroqService } from './groq';

export interface AgentDecision {
  action: 'retry' | 'skip' | 'modify' | 'escalate';
  reason: string;
  modifications?: {
    title?: string;
    description?: string;
    tags?: string[];
  };
  retryDelay?: number;
  maxRetries?: number;
}

export interface ErrorContext {
  errorType: string;
  errorMessage: string;
  platform?: string;
  videoId?: string;
  attemptNumber: number;
  metadata?: {
    title?: string;
    description?: string;
    tags?: string[];
  };
}

export class ErrorRecoveryAgent {
  private logger: Logger;
  private groqService: GroqService;

  constructor(logger: Logger, groqService: GroqService) {
    this.logger = logger;
    this.groqService = groqService;
  }

  async analyzeError(context: ErrorContext): Promise<AgentDecision> {
    await this.logger.info('agent', 'Analyzing error', { 
      errorType: context.errorType,
      errorMessage: context.errorMessage,
      platform: context.platform,
      videoId: context.videoId,
      attemptNumber: context.attemptNumber
    });

    const decision = await this.determineAction(context);
    
    await this.logger.info('agent', 'Decision made', { 
      action: decision.action, 
      reason: decision.reason 
    });

    return decision;
  }

  private async determineAction(context: ErrorContext): Promise<AgentDecision> {
    const { errorType, errorMessage, attemptNumber } = context;

    if (this.isRateLimitError(errorMessage)) {
      return {
        action: 'retry',
        reason: 'Rate limit detected - waiting before retry',
        retryDelay: this.calculateBackoff(attemptNumber),
        maxRetries: 5
      };
    }

    if (this.isAuthError(errorMessage)) {
      return {
        action: 'escalate',
        reason: 'Authentication error - credentials may be expired or invalid'
      };
    }

    if (this.isContentPolicyError(errorMessage)) {
      return await this.handleContentPolicyError(context);
    }

    if (this.isNetworkError(errorMessage)) {
      return {
        action: 'retry',
        reason: 'Network error - will retry with exponential backoff',
        retryDelay: this.calculateBackoff(attemptNumber),
        maxRetries: 3
      };
    }

    if (this.isAIError(errorType)) {
      return {
        action: 'retry',
        reason: 'AI service error - using fallback metadata and retrying',
        retryDelay: 1000,
        maxRetries: 2
      };
    }

    if (attemptNumber >= 3) {
      return {
        action: 'skip',
        reason: `Failed after ${attemptNumber} attempts - skipping video for this platform`
      };
    }

    return {
      action: 'retry',
      reason: 'Unknown error - attempting retry',
      retryDelay: this.calculateBackoff(attemptNumber),
      maxRetries: 3
    };
  }

  private isRateLimitError(message: string): boolean {
    const patterns = ['rate limit', 'too many requests', '429', 'quota exceeded'];
    return patterns.some(p => message.toLowerCase().includes(p));
  }

  private isAuthError(message: string): boolean {
    const patterns = ['unauthorized', '401', 'auth', 'token expired', 'invalid credentials'];
    return patterns.some(p => message.toLowerCase().includes(p));
  }

  private isContentPolicyError(message: string): boolean {
    const patterns = ['policy', 'community guidelines', 'violation', 'inappropriate', 'blocked'];
    return patterns.some(p => message.toLowerCase().includes(p));
  }

  private isNetworkError(message: string): boolean {
    const patterns = ['network', 'timeout', 'econnreset', 'socket', 'connection'];
    return patterns.some(p => message.toLowerCase().includes(p));
  }

  private isAIError(errorType: string): boolean {
    return errorType === 'groq' || errorType === 'ai' || errorType === 'metadata';
  }

  private async handleContentPolicyError(context: ErrorContext): Promise<AgentDecision> {
    if (!context.metadata) {
      return {
        action: 'skip',
        reason: 'Content policy violation without metadata to modify'
      };
    }

    try {
      const modifiedMetadata = await this.groqService.generateMetadata(
        `Create family-friendly, safe metadata. Previous title "${context.metadata.title}" was flagged. Make it more generic and safe.`,
        undefined
      );

      return {
        action: 'modify',
        reason: 'Content policy violation - generated safer metadata',
        modifications: modifiedMetadata
      };
    } catch {
      return {
        action: 'skip',
        reason: 'Could not generate safe metadata - skipping'
      };
    }
  }

  private calculateBackoff(attempt: number): number {
    const baseDelay = 1000;
    const maxDelay = 60000;
    const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
    return delay + Math.random() * 1000;
  }

  async logRecoveryAttempt(
    videoId: string,
    platform: string,
    decision: AgentDecision,
    success: boolean
  ): Promise<void> {
    await this.logger.info('agent', 'Recovery attempt completed', {
      videoId,
      platform,
      action: decision.action,
      success
    });
  }
}
