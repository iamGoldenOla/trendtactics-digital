# Supabase Frontend Integration Guide

## Overview
This guide explains how to connect your existing HTML/CSS/JS frontend (deployed on cPanel) to your Supabase backend without changing your current deployment setup.

## Current Architecture
- **Frontend**: Static HTML/CSS/JS files deployed on cPanel
- **Backend**: Supabase with Edge Functions
- **Deployment**: GitHub integration with .htaccess

## Integration Steps

### 1. Add Supabase SDK to Your HTML Files

Add the Supabase JavaScript SDK to the `<head>` section of your HTML files:

```html
<!-- Add to <head> section -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

### 2. Initialize Supabase Client

Add the initialization script to your HTML files or create a shared JavaScript file:

```javascript
// Initialize Supabase client
const supabaseUrl = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA'; // Get from your Supabase dashboard
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
```

### 3. Connect Authentication

Update your login forms to use Supabase authentication:

```javascript
// Login example
async function handleLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if (error) {
        console.error('Login error:', error.message);
        return { success: false, error: error.message };
    }
    
    return { success: true, data };
}
```

### 4. Integrate Edge Function Calls

Call your Supabase Edge Functions from your tools:

```javascript
// Call Edge Function example
async function analyzeContent(content) {
    const { data, error } = await supabase.functions.invoke('analyze-content', {
        body: { content: content }
    });
    
    if (error) {
        console.error('Function error:', error.message);
        return { success: false, error: error.message };
    }
    
    return { success: true, data };
}
```

## Files Updated in This Integration

1. **login.html** - Added Supabase authentication with fallback to demo mode
2. **dashboard.html** - Added authentication check and Supabase integration
3. **js/supabase-utils.js** - Created shared utility functions
4. **test-supabase-connection.html** - Created test page

## Security Considerations

### 1. API Key Management
- Use the **anon key** for frontend operations (safe for client-side)
- Never use the **service role key** in frontend code
- Store keys in environment variables when possible

### 2. Content Security Policy
Your current .htaccess should already handle CSP restrictions. No additional changes needed.

### 3. User Session Management
- Use `supabase.auth.getSession()` to check login status
- Implement proper logout with `supabase.auth.signOut()`

## Testing the Integration

### 1. Test Connection
Open `test-supabase-connection.html` in your browser to verify:
- Supabase SDK loads correctly
- Connection to your Supabase project works
- Authentication system is accessible

### 2. Test Authentication
- Try logging in through your updated login.html
- Verify session persistence in dashboard.html
- Test logout functionality

### 3. Test Function Calls
- Use tools that call Edge Functions
- Verify responses from your deployed functions

## Deployment

### 1. Update API Keys
Replace `'YOUR_ANON_KEY_HERE'` with your actual Supabase anon key in:
- login.html
- dashboard.html
- js/supabase-utils.js
- test-supabase-connection.html

### 2. Deploy Changes
Commit your changes to GitHub. Your cPanel deployment should automatically update.

### 3. Verify Deployment
- Test login functionality
- Check dashboard access
- Verify tool integrations

## Troubleshooting

### Common Issues:

1. **401 Unauthorized Errors**
   - Check that you're using the correct anon key
   - Verify your Supabase project URL is correct

2. **CORS/Network Errors**
   - Ensure your .htaccess allows connections to Supabase
   - Check that your browser isn't blocking requests

3. **Function Call Failures**
   - Verify Edge Functions are deployed
   - Check function names match exactly

### Debugging Steps:

1. Open browser developer tools (F12)
2. Check the Console tab for errors
3. Check the Network tab for failed requests
4. Verify API keys and URLs

## Next Steps

1. **Enhance User Profiles**
   - Add profile management pages
   - Implement user data storage in Supabase

2. **Course Enrollment System**
   - Connect course enrollment to Supabase
   - Track user progress in real-time

3. **Advanced Analytics**
   - Implement detailed learning analytics
   - Add data visualization for progress tracking

4. **Community Features**
   - Add discussion forums with Supabase
   - Implement messaging system

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase project settings
3. Ensure all API keys are correctly configured
4. Test with the provided test page first

The integration maintains your existing cPanel deployment while adding powerful backend functionality through Supabase.