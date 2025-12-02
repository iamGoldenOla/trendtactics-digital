/**
 * Secure AI Service
 * Handles all AI API calls server-side to protect API keys
 */

const apiKeyManager = require('../utils/apiKeyManager');

class AIService {
    constructor() {
        this.modelMap = {
            'Mistral Small': 'mistralai/mistral-small',
            'DeepSeek R1': 'deepseek-ai/deepseek-llm-r1',
            'NVIDIA Llama 3.1': 'nvidia/nemotron-llama-3-8b',
            'Kimi Dev 72b': 'moonshot-v1-72b',
            'Qwen3 30B': 'qwen/qwen3-30b',
            'Meta Llama 4': 'meta-llama/llama-4-8b',
            'Qwen3 32B': 'qwen/qwen3-32b',
            'DeepSeek V3': 'deepseek-ai/deepseek-llm-v3',
            'Google Gemma 3': 'google/gemma-3b',
            'Google Gemini 2.0': 'google/gemini-1.5-flash',
            'Mistral Nemo': 'mistralai/mistral-nemo',
            'Agentica Deepcoder': 'agentica/deepcoder-14b',
            'MiniMax M1': 'minimax/minimax-m1',
        };

        this.preferredModelOrder = [
            'Mistral Small',
            'DeepSeek R1',
            'Meta Llama 4',
            'Qwen3 30B',
            'Qwen3 32B',
            'DeepSeek V3',
            'Google Gemma 3',
            'Google Gemini 2.0',
            'Mistral Nemo',
            'Agentica Deepcoder',
            'MiniMax M1',
            'Kimi Dev 72b',
            'NVIDIA Llama 3.1',
        ];
    }

    /**
     * Get AI response from OpenRouter with automatic failover
     */
    async getOpenRouterResponse(prompt, modelLabel = null, options = {}) {
        const modelLabels = modelLabel
            ? (Array.isArray(modelLabel) ? modelLabel : [modelLabel])
            : this.preferredModelOrder;

        let lastError = null;

        for (const label of modelLabels) {
            const model = this.modelMap[label] || label;
            const keyObj = apiKeyManager.getKey('openrouter');

            if (!keyObj) {
                throw new Error('No OpenRouter API keys available');
            }

            try {
                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${keyObj.key}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': process.env.CLIENT_URL || 'https://trendtacticsdigital.com',
                        'X-Title': 'Trendtactics Digital Tools'
                    },
                    body: JSON.stringify({
                        model,
                        messages: [{ role: 'user', content: prompt }],
                        max_tokens: options.maxTokens || 1000,
                        temperature: options.temperature || 0.7,
                        ...options
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                    // Record successful usage
                    apiKeyManager.recordUsage('openrouter', keyObj.key, true);
                    return {
                        content: data.choices[0].message.content,
                        model: label,
                        usage: data.usage || null
                    };
                } else {
                    lastError = data;
                    apiKeyManager.recordUsage('openrouter', keyObj.key, false);
                }
            } catch (err) {
                lastError = err;
                apiKeyManager.recordUsage('openrouter', keyObj.key, false);
            }
        }

        throw new Error(`All OpenRouter models failed. Last error: ${JSON.stringify(lastError)}`);
    }

    /**
     * Get AI response from OpenAI
     */
    async getOpenAIResponse(prompt, options = {}) {
        const apiKey = apiKeyManager.getKey('openai');
        
        if (!apiKey) {
            throw new Error('OpenAI API key not configured');
        }

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: options.model || 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: options.maxTokens || 1000,
                    temperature: options.temperature || 0.7,
                    ...options
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                return {
                    content: data.choices[0].message.content,
                    model: options.model || 'gpt-3.5-turbo',
                    usage: data.usage || null
                };
            } else {
                throw new Error('Invalid response format from OpenAI');
            }
        } catch (err) {
            throw new Error(`OpenAI API error: ${err.message}`);
        }
    }

    /**
     * Get AI response from Google AI
     */
    async getGoogleAIResponse(prompt, options = {}) {
        const apiKey = apiKeyManager.getKey('google');
        
        if (!apiKey) {
            throw new Error('Google AI API key not configured');
        }

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${options.model || 'gemini-1.5-flash'}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        maxOutputTokens: options.maxTokens || 1000,
                        temperature: options.temperature || 0.7,
                        ...options.generationConfig
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                return {
                    content: data.candidates[0].content.parts[0].text,
                    model: options.model || 'gemini-1.5-flash',
                    usage: data.usageMetadata || null
                };
            } else {
                throw new Error('Invalid response format from Google AI');
            }
        } catch (err) {
            throw new Error(`Google AI API error: ${err.message}`);
        }
    }

    /**
     * Get AI response with automatic provider selection
     */
    async getAIResponse(prompt, options = {}) {
        const { provider = 'openrouter', ...providerOptions } = options;

        try {
            switch (provider.toLowerCase()) {
                case 'openrouter':
                    return await this.getOpenRouterResponse(prompt, providerOptions.model, providerOptions);
                case 'openai':
                    return await this.getOpenAIResponse(prompt, providerOptions);
                case 'google':
                    return await this.getGoogleAIResponse(prompt, providerOptions);
                default:
                    // Try OpenRouter first, then fallback to others
                    try {
                        return await this.getOpenRouterResponse(prompt, providerOptions.model, providerOptions);
                    } catch (err) {
                        console.log('OpenRouter failed, trying OpenAI...');
                        return await this.getOpenAIResponse(prompt, providerOptions);
                    }
            }
        } catch (err) {
            throw new Error(`AI service error: ${err.message}`);
        }
    }

    /**
     * Get available models
     */
    getAvailableModels() {
        return {
            openrouter: Object.keys(this.modelMap),
            openai: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k'],
            google: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash']
        };
    }

    /**
     * Get API key statistics (admin only)
     */
    getAPIStats() {
        return apiKeyManager.getStats();
    }
}

module.exports = new AIService(); 