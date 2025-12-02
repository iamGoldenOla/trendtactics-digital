/**
 * Secure AI API Routes
 * All AI requests go through these routes to protect API keys
 */

const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const rateLimit = require('express-rate-limit');

// Rate limiting for AI requests
const aiLimiter = rateLimit({
    windowMs: parseInt(process.env.AI_RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.AI_RATE_LIMIT_MAX) || 50, // 50 requests per window
    message: {
        success: false,
        message: 'Too many AI requests. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiting to all AI routes
router.use(aiLimiter);

/**
 * @route   POST /api/ai/chat
 * @desc    Get AI response for general chat
 * @access  Public
 */
router.post('/chat', async (req, res) => {
    try {
        const { prompt, provider, model, options } = req.body;

        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Valid prompt is required'
            });
        }

        const response = await aiService.getAIResponse(prompt, {
            provider: provider || 'openrouter',
            model,
            ...options
        });

        res.json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'AI service error'
        });
    }
});

/**
 * @route   POST /api/ai/tools/headline-generator
 * @desc    Generate headlines for marketing
 * @access  Public
 */
router.post('/tools/headline-generator', async (req, res) => {
    try {
        const { topic, count = 5, style = 'marketing' } = req.body;

        if (!topic || typeof topic !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Topic is required'
            });
        }

        const prompt = `Generate ${count} catchy ${style} headlines for: "${topic}". 
        Make them engaging, SEO-friendly, and suitable for social media. 
        Format as a numbered list.`;

        const response = await aiService.getAIResponse(prompt, {
            provider: 'openrouter',
            maxTokens: 500,
            temperature: 0.8
        });

        res.json({
            success: true,
            data: {
                headlines: response.content.split('\n').filter(line => line.trim()),
                topic,
                count,
                style
            }
        });

    } catch (error) {
        console.error('Headline Generator Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Headline generation failed'
        });
    }
});

/**
 * @route   POST /api/ai/tools/hashtag-generator
 * @desc    Generate hashtags for social media
 * @access  Public
 */
router.post('/tools/hashtag-generator', async (req, res) => {
    try {
        const { topic, platform = 'general', count = 10 } = req.body;

        if (!topic || typeof topic !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Topic is required'
            });
        }

        const prompt = `Generate ${count} relevant hashtags for "${topic}" on ${platform}. 
        Include trending and niche hashtags. Format as a list with # symbols.`;

        const response = await aiService.getAIResponse(prompt, {
            provider: 'openrouter',
            maxTokens: 300,
            temperature: 0.7
        });

        res.json({
            success: true,
            data: {
                hashtags: response.content.split('\n').filter(line => line.trim()),
                topic,
                platform,
                count
            }
        });

    } catch (error) {
        console.error('Hashtag Generator Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Hashtag generation failed'
        });
    }
});

/**
 * @route   POST /api/ai/tools/content-optimizer
 * @desc    Optimize content for SEO and engagement
 * @access  Public
 */
router.post('/tools/content-optimizer', async (req, res) => {
    try {
        const { content, target, platform } = req.body;

        if (!content || typeof content !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Content is required'
            });
        }

        const prompt = `Optimize this content for ${target || 'SEO and engagement'} on ${platform || 'social media'}:
        
        "${content}"
        
        Provide specific improvements and an optimized version.`;

        const response = await aiService.getAIResponse(prompt, {
            provider: 'openrouter',
            maxTokens: 800,
            temperature: 0.6
        });

        res.json({
            success: true,
            data: {
                original: content,
                optimized: response.content,
                target,
                platform
            }
        });

    } catch (error) {
        console.error('Content Optimizer Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Content optimization failed'
        });
    }
});

/**
 * @route   POST /api/ai/tools/business-strategy
 * @desc    Generate business strategy recommendations
 * @access  Public
 */
router.post('/tools/business-strategy', async (req, res) => {
    try {
        const { business, industry, goals, challenges } = req.body;

        if (!business || typeof business !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Business name is required'
            });
        }

        const prompt = `Create a comprehensive business strategy for ${business} (${industry || 'business'}) with goals: ${goals || 'growth'} and challenges: ${challenges || 'competition'}. 
        Include marketing, operations, and growth strategies.`;

        const response = await aiService.getAIResponse(prompt, {
            provider: 'openrouter',
            maxTokens: 1200,
            temperature: 0.7
        });

        res.json({
            success: true,
            data: {
                business,
                strategy: response.content,
                industry,
                goals,
                challenges
            }
        });

    } catch (error) {
        console.error('Business Strategy Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Strategy generation failed'
        });
    }
});

/**
 * @route   GET /api/ai/models
 * @desc    Get available AI models
 * @access  Public
 */
router.get('/models', (req, res) => {
    try {
        const models = aiService.getAvailableModels();
        res.json({
            success: true,
            data: models
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get models'
        });
    }
});

/**
 * @route   GET /api/ai/stats
 * @desc    Get API usage statistics (admin only)
 * @access  Private
 */
router.get('/stats', (req, res) => {
    try {
        // TODO: Add admin authentication middleware
        const stats = aiService.getAPIStats();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get stats'
        });
    }
});

module.exports = router; 