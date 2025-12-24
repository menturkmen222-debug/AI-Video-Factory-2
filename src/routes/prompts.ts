import { Logger } from '../utils/logger';
import { PromptsManager, VideoPrompt } from '../db/prompts';
import { PromptsAIService, DetailedPrompt } from '../services/promptsAI';
import { VideoGeneratorService } from '../services/videoGenerator';
import { GroqConfig } from '../services/groq';

export async function handleGetAllPrompts(
  promptsManager: PromptsManager,
  logger: Logger
): Promise<Response> {
  try {
    await logger.info('prompts', 'Fetching all prompts');
    const prompts = await promptsManager.getAllPrompts();
    
    if (prompts.length === 0) {
      await logger.info('prompts', 'No prompts found, initializing defaults');
      const initializedPrompts = await promptsManager.initializeDefaultPrompts();
      return new Response(JSON.stringify({
        success: true,
        prompts: initializedPrompts,
        count: initializedPrompts.length,
        initialized: true
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      prompts,
      count: prompts.length,
      initialized: false
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to fetch prompts', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleGetPromptsByChannel(
  request: Request,
  promptsManager: PromptsManager,
  logger: Logger
): Promise<Response> {
  try {
    const url = new URL(request.url);
    const channelId = url.searchParams.get('channelId');

    if (!channelId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'channelId parameter is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('prompts', 'Fetching prompts by channel', { channelId });
    const prompts = await promptsManager.getPromptsByChannel(channelId);

    return new Response(JSON.stringify({
      success: true,
      prompts,
      count: prompts.length,
      channelId
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to fetch prompts by channel', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleValidatePrompt(
  request: Request,
  promptsManager: PromptsManager,
  promptsAI: PromptsAIService,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as { promptId: string };
    const { promptId } = body;

    if (!promptId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'promptId is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('prompts', 'Validating prompt', { promptId });

    const prompt = await promptsManager.getPromptById(promptId);
    if (!prompt) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Prompt not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const validationResult = await promptsAI.validatePrompt(prompt);
    
    const updatedPrompt = await promptsManager.updatePromptValidation(
      promptId,
      validationResult.status,
      validationResult.message,
      validationResult.suggestion
    );

    return new Response(JSON.stringify({
      success: true,
      prompt: updatedPrompt,
      validation: validationResult
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to validate prompt', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleCopyPrompt(
  request: Request,
  promptsManager: PromptsManager,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as { promptId: string };
    const { promptId } = body;

    if (!promptId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'promptId is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('prompts', 'Copying prompt', { promptId });

    const prompt = await promptsManager.getPromptById(promptId);
    if (!prompt) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Prompt not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      prompt: prompt,
      text: prompt.promptText
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to copy prompt', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleUpdatePrompt(
  request: Request,
  promptsManager: PromptsManager,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as { promptId: string; promptText: string };
    const { promptId, promptText } = body;

    if (!promptId || !promptText) {
      return new Response(JSON.stringify({
        success: false,
        error: 'promptId and promptText are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('prompts', 'Updating prompt', { promptId });

    const updatedPrompt = await promptsManager.updatePrompt(promptId, {
      promptText,
      validationStatus: 'pending'
    });

    if (!updatedPrompt) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Prompt not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      prompt: updatedPrompt
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to update prompt', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleValidateAllPrompts(
  promptsManager: PromptsManager,
  promptsAI: PromptsAIService,
  logger: Logger
): Promise<Response> {
  try {
    await logger.info('prompts', 'Validating all prompts');

    const prompts = await promptsManager.getAllPrompts();
    if (prompts.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'No prompts to validate'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const results = await promptsAI.validateAllPrompts(prompts);
    
    for (const [promptId, result] of results) {
      await promptsManager.updatePromptValidation(
        promptId,
        result.status,
        result.message,
        result.suggestion
      );
    }

    const updatedPrompts = await promptsManager.getAllPrompts();
    const stats = {
      total: updatedPrompts.length,
      validated: updatedPrompts.filter(p => p.validationStatus === 'validated').length,
      needsImprovement: updatedPrompts.filter(p => p.validationStatus === 'needs_improvement').length,
      errors: updatedPrompts.filter(p => p.validationStatus === 'error').length,
      pending: updatedPrompts.filter(p => p.validationStatus === 'pending').length
    };

    return new Response(JSON.stringify({
      success: true,
      prompts: updatedPrompts,
      stats
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to validate all prompts', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleResetPrompts(
  promptsManager: PromptsManager,
  logger: Logger
): Promise<Response> {
  try {
    await logger.info('prompts', 'Resetting prompts to defaults');
    
    await promptsManager.saveAllPrompts([]);
    const prompts = await promptsManager.initializeDefaultPrompts();

    return new Response(JSON.stringify({
      success: true,
      prompts,
      count: prompts.length,
      message: 'Prompts reset to defaults'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to reset prompts', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleGetPromptsStats(
  promptsManager: PromptsManager,
  logger: Logger
): Promise<Response> {
  try {
    await logger.info('prompts', 'Fetching prompts stats');

    const prompts = await promptsManager.getAllPrompts();
    const channelStats = promptsManager.getChannelStats();

    const stats = {
      total: prompts.length,
      byStatus: {
        validated: prompts.filter(p => p.validationStatus === 'validated').length,
        needsImprovement: prompts.filter(p => p.validationStatus === 'needs_improvement').length,
        error: prompts.filter(p => p.validationStatus === 'error').length,
        pending: prompts.filter(p => p.validationStatus === 'pending').length
      },
      byChannel: channelStats.map(ch => ({
        ...ch,
        prompts: prompts.filter(p => p.channelId === ch.channelId).length,
        validated: prompts.filter(p => p.channelId === ch.channelId && p.validationStatus === 'validated').length
      }))
    };

    return new Response(JSON.stringify({
      success: true,
      stats
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to fetch prompts stats', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleImprovePrompt(
  request: Request,
  promptsManager: PromptsManager,
  promptsAI: PromptsAIService,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as { promptId: string };
    const { promptId } = body;

    if (!promptId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'promptId is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('prompts', 'Improving prompt', { promptId });

    const prompt = await promptsManager.getPromptById(promptId);
    if (!prompt) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Prompt not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const validationResult = await promptsAI.validatePrompt(prompt);
    const suggestion = validationResult.suggestion || prompt.promptText;
    
    const improvedPrompt = await promptsManager.updatePrompt(promptId, {
      promptText: suggestion,
      validationStatus: 'validated',
      validationMessage: validationResult.message,
      aiSuggestion: validationResult.suggestion
    });

    return new Response(JSON.stringify({
      success: true,
      prompt: improvedPrompt,
      message: 'Prompt successfully improved'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to improve prompt', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleGenerateDetailedPrompt(
  request: Request,
  promptsManager: PromptsManager,
  promptsAI: PromptsAIService,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as { promptId: string };
    const { promptId } = body;

    if (!promptId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'promptId is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('prompts', 'Generating detailed prompt', { promptId });

    const prompt = await promptsManager.getPromptById(promptId);
    if (!prompt) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Prompt not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const detailed = await promptsAI.generateDetailedPrompt(prompt);

    return new Response(JSON.stringify({
      success: true,
      prompt: prompt,
      detailed,
      message: 'Detailed prompt generated successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to generate detailed prompt', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleGenerateVideoSpec(
  request: Request,
  promptsManager: PromptsManager,
  videoGenerator: VideoGeneratorService,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as { promptId: string };
    const { promptId } = body;

    if (!promptId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'promptId is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('prompts', 'Generating video spec', { promptId });

    const prompt = await promptsManager.getPromptById(promptId);
    if (!prompt) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Prompt not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const videoSpec = await videoGenerator.generateCompleteVideoSpec(prompt);

    return new Response(JSON.stringify({
      success: true,
      prompt: prompt,
      videoSpec,
      message: 'Complete video specification generated successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('prompts', 'Failed to generate video spec', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
