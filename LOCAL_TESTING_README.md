# 🧪 Local Testing Setup for Trendtactics Academy

This guide helps you test your Trendtactics Academy locally before going live.

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Local Server**:
   ```bash
   # Option 1: Using our script
   .\start-local-testing.ps1  # PowerShell
   # OR
   start-local-testing.bat     # Command Prompt
   
   # Option 2: Using npm script
   npm run test-server
   ```

3. **Open in Browser**:
   Visit `http://localhost:8000/academy.html`

## 🧾 Available Test Commands

```bash
# Start local testing server
npm run test-server

# Create a test user
npm run create-test-user

# Add sample courses to database
npm run add-sample-courses

# Add course structure (modules/lessons)
npm run add-course-structure

# Verify Academy setup
npm run verify-setup

# Test backend connection
npm run test-backend
```

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Python**, **Node.js**, or **PHP** for local server
- **Internet connection** (to connect to Supabase)

## 🔧 Configuration

Before testing, ensure your Academy Supabase credentials are correctly configured in:
- `js/academy-supabase.js`
- `create-test-user.js`

## 🎯 Testing Workflow

1. **Start Server**: Run local server script
2. **Create Test User**: `npm run create-test-user`
3. **Add Sample Data**: `npm run add-sample-courses`
4. **Verify Setup**: `npm run verify-setup`
5. **Test in Browser**: Open `http://localhost:8000/academy.html`

## 🆘 Troubleshooting

### Server Won't Start
- Ensure you have Python, Node.js, or PHP installed
- Try running scripts directly instead of through npm

### Database Connection Issues
- Verify Supabase URL and ANON key in configuration files
- Check internet connectivity
- Confirm Supabase project is accessible

### Missing Sample Data
- Run `npm run add-sample-courses` to populate database
- Check Supabase SQL Editor for successful script execution

## 📁 Important Files

- `academy.html` - Main Academy page
- `js/academy-supabase.js` - Academy Supabase client
- `LOCAL_TESTING_GUIDE.html` - Visual testing guide
- `start-local-testing.ps1` - PowerShell server script
- `start-local-testing.bat` - Batch server script

## 🔐 Test Credentials

Default test user:
- Email: `test@edvouralearninghub.com`
- Password: `TestPass123!`

Feel free to create additional test users as needed.

---

Your Academy is ready for testing! All backend systems are deployed and functional.