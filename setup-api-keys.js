#!/usr/bin/env node

/**
 * API Keys Setup Script
 * Helps you securely set up API keys for Trendtactics Digital tools
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔐 Trendtactics Digital - Secure API Keys Setup');
console.log('='.repeat(50));

// Check if .env file already exists
const envPath = path.join(__dirname, 'backend', '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
    console.log('⚠️  .env file already exists in backend/ directory');
    console.log('📁 Current location:', envPath);
    
    rl.question('Do you want to overwrite it? (y/N): ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            createEnvFile();
        } else {
            console.log('✅ Keeping existing .env file');
            console.log('📝 You can manually edit it to add your API keys');
            rl.close();
        }
    });
} else {
    createEnvFile();
}

function createEnvFile() {
    console.log('\n📝 Creating .env file...');
    
    const envContent = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/trendtactics-lms
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# AI API Keys (SECURE - Never commit to version control)
# OpenRouter API Keys (Add as many as you have)
OPENROUTER_KEY_1=sk-or-v1-your-first-openrouter-key-here
OPENROUTER_KEY_2=sk-or-v1-your-second-openrouter-key-here
OPENROUTER_KEY_3=sk-or-v1-your-third-openrouter-key-here

# OpenAI API Key (Alternative)
OPENAI_API_KEY=sk-your-openai-key-here

# Google AI API Key (Alternative)
GOOGLE_AI_API_KEY=your-google-ai-key-here

# Anthropic API Key (Alternative)
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# Rate Limiting for AI APIs
AI_RATE_LIMIT_WINDOW=900000
AI_RATE_LIMIT_MAX=50

# Security
API_KEY_ROTATION_INTERVAL=3600000
MAX_CONCURRENT_AI_REQUESTS=10
`;

    try {
        // Ensure backend directory exists
        const backendDir = path.dirname(envPath);
        if (!fs.existsSync(backendDir)) {
            fs.mkdirSync(backendDir, { recursive: true });
        }

        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file created successfully!');
        console.log('📁 Location:', envPath);
        
        showNextSteps();
        
    } catch (error) {
        console.error('❌ Error creating .env file:', error.message);
        rl.close();
    }
}

function showNextSteps() {
    console.log('\n🎯 Next Steps:');
    console.log('='.repeat(30));
    console.log('1. 📝 Edit the .env file and add your actual API keys');
    console.log('2. 🔑 Get API keys from:');
    console.log('   • OpenRouter: https://openrouter.ai');
    console.log('   • OpenAI: https://platform.openai.com');
    console.log('   • Google AI: https://aistudio.google.com');
    console.log('3. 🚀 Start the backend server:');
    console.log('   cd backend && npm start');
    console.log('4. 🧪 Test the setup by opening tools.html');
    
    console.log('\n🔒 Security Reminders:');
    console.log('• Never commit .env file to version control');
    console.log('• Keep your API keys private and secure');
    console.log('• Monitor usage to control costs');
    
    console.log('\n📚 For detailed instructions, see: API_KEYS_SETUP.md');
    
    rl.close();
}

// Handle script termination
process.on('SIGINT', () => {
    console.log('\n\n👋 Setup cancelled. You can run this script again anytime.');
    rl.close();
    process.exit(0);
}); 