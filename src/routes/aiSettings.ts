import { Logger } from '../utils/logger';
import { AISettingsManager, AIProvider } from '../services/aiSettings';

export async function handleGetAISettings(
  aiSettings: AISettingsManager,
  logger: Logger
): Promise<Response> {
  try {
    await logger.info('aiSettings', 'Fetching AI settings');
    const settings = await aiSettings.getSettings();

    return new Response(JSON.stringify({
      success: true,
      settings
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('aiSettings', 'Failed to get AI settings', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleSetAIProvider(
  request: Request,
  aiSettings: AISettingsManager,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as { provider: AIProvider };
    const { provider } = body;

    if (!provider || !['auto', 'groq', 'openrouter'].includes(provider)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid provider. Must be one of: auto, groq, openrouter'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('aiSettings', 'Setting AI provider', { provider });
    const settings = await aiSettings.setProvider(provider);

    return new Response(JSON.stringify({
      success: true,
      settings
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('aiSettings', 'Failed to set AI provider', { error: errorMessage });
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
