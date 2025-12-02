# 🔐 Secure API Keys Setup Guide

## Overview
This guide shows you how to securely add your API keys to the Trendtactics Digital tools without exposing them to users.

## 🚨 Security Features Implemented

✅ **Server-side API calls** - All API keys stay on the backend  
✅ **Environment variables** - Keys stored securely in .env file  
✅ **Rate limiting** - Prevents abuse and excessive usage  
✅ **Key rotation** - Automatic failover between multiple keys  
✅ **Usage tracking** - Monitor API usage and costs  
✅ **No frontend exposure** - Keys never sent to browser  

## 📁 File Structure

```
backend/
├── .env                    # Your API keys go here (create this file)
├── utils/apiKeyManager.js  # Manages API keys securely
├── services/aiService.js   # Handles AI API calls
└── routes/ai.js           # Secure API endpoints

js/
├── secure-ai-client.js    # Frontend client (no keys exposed)
└── tools.js              # Updated to use secure client
```

## 🔧 Setup Instructions

### Step 1: Create Environment File

Create a file called `.env` in the `backend/` directory:

```bash
# Navigate to backend directory
cd backend

# Create .env file (Windows)
echo. > .env

# Create .env file (Mac/Linux)
touch .env
```

### Step 2: Add Your API Keys

Open the `.env` file and add your API keys:

```env
# Database Configuration
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
```

### Step 3: Get API Keys

#### OpenRouter (Recommended)
1. Go to [OpenRouter.ai](https://openrouter.ai)
2. Sign up and get your API key
3. Add it as `OPENROUTER_KEY_1=sk-or-v1-your-key-here`

#### OpenAI (Alternative)
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an account and get your API key
3. Add it as `OPENAI_API_KEY=sk-your-key-here`

#### Google AI (Alternative)
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Get your API key
3. Add it as `GOOGLE_AI_API_KEY=your-key-here`

### Step 4: Start the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start the server
npm start
```

### Step 5: Update Frontend

The frontend has been updated to use the secure client. Update your `tools.html` to include the secure client:

```html
<!-- Replace the old openrouter-helper.js with the secure client -->
<script src="js/secure-ai-client.js"></script>
```

## 🔒 Security Best Practices

### 1. Never Commit API Keys
```bash
# Add .env to .gitignore
echo ".env" >> .gitignore
```

### 2. Use Multiple API Keys
- Add several OpenRouter keys for redundancy
- System automatically rotates between them
- If one fails, it tries the next

### 3. Monitor Usage
- Check API usage in your OpenRouter dashboard
- Set up billing alerts
- Monitor the `/api/ai/stats` endpoint

### 4. Rate Limiting
- Default: 50 requests per 15 minutes per IP
- Adjust in `.env` file if needed
- Prevents abuse and excessive costs

## 🛠️ Testing Your Setup

### Test the Backend
```bash
# Test the health endpoint
curl http://localhost:5000/health

# Test AI endpoint (replace with your actual prompt)
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello, how are you?"}'
```

### Test the Frontend
1. Open `tools.html` in your browser
2. Try any AI tool (headline generator, hashtag generator, etc.)
3. Check browser console for any errors

## 📊 Monitoring & Analytics

### API Usage Statistics
Access `/api/ai/stats` to see:
- Which keys are being used
- Usage counts per key
- Error rates
- Last rotation time

### Tool Usage Tracking
The system automatically tracks:
- Which tools are most popular
- Usage frequency
- User engagement

## 🚨 Troubleshooting

### Common Issues

**1. "No OpenRouter API keys available"**
- Check that your `.env` file exists in the backend directory
- Verify API key format: `sk-or-v1-...`
- Restart the backend server after adding keys

**2. "Too many requests"**
- Increase `AI_RATE_LIMIT_MAX` in `.env`
- Check if you're hitting API provider limits

**3. "AI service error"**
- Check backend console for detailed error messages
- Verify API keys are valid and have credits
- Check network connectivity

**4. Frontend not connecting to backend**
- Ensure backend is running on port 5000
- Check CORS settings in `server.js`
- Verify the `baseURL` in `secure-ai-client.js`

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=ai:*
```

## 🔄 Updating API Keys

### Add New Keys
1. Add new keys to `.env` file
2. Restart the backend server
3. Keys are automatically detected and used

### Remove Keys
1. Remove keys from `.env` file
2. Restart the backend server
3. System will use remaining keys

### Rotate Keys
1. Update keys in `.env` file
2. Restart the backend server
3. Old keys are automatically replaced

## 📈 Scaling Considerations

### For High Traffic
- Add more API keys for redundancy
- Increase rate limits
- Consider load balancing
- Monitor costs closely

### For Production
- Use environment-specific `.env` files
- Set up proper logging
- Configure monitoring alerts
- Implement user authentication

## 🎯 Next Steps

1. **Add your API keys** to the `.env` file
2. **Test the setup** with a simple AI request
3. **Monitor usage** to ensure everything works
4. **Deploy to production** when ready

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review backend console logs
3. Verify API key validity
4. Contact support if needed

---

**Remember**: Never share your `.env` file or commit it to version control. Your API keys should always remain private and secure! 🔐 