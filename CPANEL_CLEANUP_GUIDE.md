# cPanel Cleanup Guide

## Current Situation
- ✅ Files should be in `/public_html/` (root)
- ❌ There's a duplicate folder `/public_html/trendtacticsdigital/` 
- ❌ There's a duplicate `.htaccess` in `/public_html/trendtacticsdigital/`

## Solution

### Step 1: Verify Deployment Path
Your `FTP_SERVER_DIR` secret should be set to: `/public_html/`

This is already configured in the workflow, so deployments will go directly to `/public_html/`.

### Step 2: Remove Duplicate .htaccess
You should only have ONE `.htaccess` file in `/public_html/` (root).

**In cPanel File Manager:**
1. Navigate to `/public_html/trendtacticsdigital/`
2. If there's a `.htaccess` file there, **DELETE IT**
3. Keep only the `.htaccess` in `/public_html/` (root)

### Step 3: Clean Up Old Folder (Optional)
If `/public_html/trendtacticsdigital/` is an old/unused folder:

**Option A: Delete the folder (if not needed)**
1. In cPanel File Manager, navigate to `/public_html/`
2. Delete the `trendtacticsdigital` folder (if it's not being used)

**Option B: Keep it (if it's used for something else)**
- Just make sure it doesn't have a `.htaccess` file that conflicts

### Step 4: Verify Your Setup
After cleanup, your structure should be:
```
/public_html/
  ├── .htaccess          ← Only ONE .htaccess here
  ├── index.html
  ├── about.html
  ├── tools.html
  ├── images/
  ├── js/
  ├── styles/
  └── ... (all your website files)
```

## Why This Matters
- Multiple `.htaccess` files can cause conflicts
- The root `.htaccess` handles all clean URLs for your site
- Having a duplicate in a subfolder can break redirects

## Deployment Confirmation
Your workflow is already configured to deploy to `/public_html/`:
- ✅ `FTP_SERVER_DIR: /public_html/` (or leave empty, defaults to this)
- ✅ Workflow excludes unnecessary folders
- ✅ Only website files will be deployed

