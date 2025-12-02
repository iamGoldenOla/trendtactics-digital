#!/usr/bin/env node

/**
 * Create .env file with all provided API keys
 */

const fs = require('fs');
const path = require('path');

console.log('🔐 Creating .env file with your API keys...');

const envContent = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/trendtactics-lms
NODE_ENV=development
PORT=5001
CLIENT_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=trendtactics-digital-super-secret-jwt-key-2025
JWT_EXPIRE=30d

# AI API Keys (SECURE - Never commit to version control)
# OpenRouter API Keys - All your provided keys
OPENROUTER_KEY_1=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
OPENROUTER_KEY_2=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
OPENROUTER_KEY_3=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
OPENROUTER_KEY_4=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
OPENROUTER_KEY_5=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
OPENROUTER_KEY_6=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
OPENROUTER_KEY_7=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
OPENROUTER_KEY_8=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
OPENROUTER_KEY_9=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
OPENROUTER_KEY_10=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
OPENROUTER_KEY_11=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
OPENROUTER_KEY_12=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
OPENROUTER_KEY_13=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
OPENROUTER_KEY_14=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
OPENROUTER_KEY_15=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
OPENROUTER_KEY_16=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
OPENROUTER_KEY_17=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
OPENROUTER_KEY_18=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
OPENROUTER_KEY_19=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
OPENROUTER_KEY_20=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
OPENROUTER_KEY_21=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

# OpenAI API Key (Alternative - Optional)
OPENAI_API_KEY=sk-your-openai-key-here

# Google AI API Key (Alternative - Optional)
GOOGLE_AI_API_KEY=your-google-ai-key-here

# Anthropic API Key (Alternative - Optional)
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# Rate Limiting for AI APIs
AI_RATE_LIMIT_WINDOW=900000
AI_RATE_LIMIT_MAX=100

# Security
API_KEY_ROTATION_INTERVAL=3600000
MAX_CONCURRENT_AI_REQUESTS=20
`;

const envPath = path.join(__dirname, 'backend', '.env');

try {
    // Ensure backend directory exists
    const backendDir = path.dirname(envPath);
    if (!fs.existsSync(backendDir)) {
        fs.mkdirSync(backendDir, { recursive: true });
    }

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📁 Location:', envPath);
    console.log('🔑 Total API keys added: 21 OpenRouter keys');
    console.log('🚀 Ready to start the backend server!');
    
} catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    process.exit(1);
} 