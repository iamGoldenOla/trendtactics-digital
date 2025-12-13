# 🚀 Deploy Academy Edge Functions

This guide will help you deploy the Edge Functions to your Academy Supabase project.

## 📋 Prerequisites

1. **Supabase CLI** installed
2. **Logged into Supabase CLI**
3. **Academy Supabase project** created
4. **Project Reference ID** for your Academy project

## 🔧 Deployment Steps

### 1. Install Supabase CLI (if not already installed)

```bash
# For Windows (using PowerShell)
npm install -g supabase

# Or using Chocolatey
choco install supabase-cli

# Or using Scoop
scoop install supabase
```

### 2. Login to Supabase CLI

```bash
supabase login
```

This will open a browser window where you can log in to your Supabase account.

### 3. Link Your Project (Optional but Recommended)

Navigate to your project directory and link it to your Academy project:

```bash
# Navigate to project root
cd c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean

# Link to your Academy project (replace with your actual project ID)
supabase link --project-ref YOUR_ACADEMY_PROJECT_ID
```

### 4. Deploy All Functions

Deploy all Edge Functions to your Academy project:

```bash
# Deploy all functions at once
supabase functions deploy --project-ref YOUR_ACADEMY_PROJECT_ID
```

Or deploy individual functions:

```bash
# Deploy specific functions
supabase functions deploy get-courses --project-ref YOUR_ACADEMY_PROJECT_ID
supabase functions deploy enroll --project-ref YOUR_ACADEMY_PROJECT_ID
supabase functions deploy get-enrollments --project-ref YOUR_ACADEMY_PROJECT_ID
supabase functions deploy get-course --project-ref YOUR_ACADEMY_PROJECT_ID
supabase functions deploy update-progress --project-ref YOUR_ACADEMY_PROJECT_ID
```

### 5. Verify Deployment

Check that your functions are deployed:

```bash
# List deployed functions
supabase functions list --project-ref YOUR_ACADEMY_PROJECT_ID
```

## 🧪 Test Your Functions

After deployment, test your functions using the Supabase Dashboard or with curl:

### Using Supabase Dashboard

1. Go to your Academy project in the Supabase Dashboard
2. Navigate to "Database" → "Functions"
3. Click on each function to test it

### Using curl

```bash
# Test get-courses function
curl -X GET "https://YOUR_ACADEMY_PROJECT_ID.functions.supabase.co/get-courses" \
  -H "Authorization: Bearer YOUR_USER_JWT_TOKEN"

# Test enroll function (requires authentication)
curl -X POST "https://YOUR_ACADEMY_PROJECT_ID.functions.supabase.co/enroll" \
  -H "Authorization: Bearer YOUR_USER_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"courseId": "COURSE_UUID"}'
```

## 🛠️ Troubleshooting

### Common Issues

1. **"Project not found" error**
   - Verify your project reference ID is correct
   - Ensure you have access to the project

2. **"Unauthorized" error**
   - Make sure you're logged into the Supabase CLI
   - Check that you have the correct permissions for the project

3. **"Function not found" error**
   - Verify the function names match the directory names
   - Check that the functions were built successfully

### Function Logs

View function logs for debugging:

```bash
# View logs for a specific function
supabase functions logs get-courses --project-ref YOUR_ACADEMY_PROJECT_ID

# View logs for all functions
supabase functions logs --project-ref YOUR_ACADEMY_PROJECT_ID
```

## 🔄 Update Functions

When you make changes to your functions:

1. Modify the function code in `supabase/functions/`
2. Redeploy the updated functions:

```bash
# Redeploy specific function
supabase functions deploy get-courses --project-ref YOUR_ACADEMY_PROJECT_ID

# Or redeploy all functions
supabase functions deploy --project-ref YOUR_ACADEMY_PROJECT_ID
```

## 📦 Environment Variables

If your functions require environment variables:

1. Set them in the Supabase Dashboard:
   - Go to your Academy project
   - Settings → Configuration → Environment Variables
   - Add your variables

2. Or set them via CLI:
```bash
supabase secrets set MY_VARIABLE=value --project-ref YOUR_ACADEMY_PROJECT_ID
```

## ✅ Success Verification

After deployment, verify that:

1. All functions appear in the Supabase Dashboard
2. Functions respond correctly to test requests
3. Academy page can successfully call the functions
4. Enrollment functionality works as expected

## 🆘 Need Help?

If you encounter issues:

1. Check the function logs
2. Verify your project credentials
3. Ensure your database schema matches the function expectations
4. Confirm your Supabase CLI is up to date

For further assistance, refer to the [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions).