# Deployment Fix Guide

## Problem
- All 30 workflow runs are failing/not uploading
- Folder name mismatch: cPanel has `trendtactics-digital` but GitHub repo is `trendtacticsdigital`

## Solution

### Option 1: Update FTP_SERVER_DIR Secret (Recommended)

If your website files are in a subdirectory in cPanel:

1. Go to GitHub → Settings → Secrets and variables → Actions
2. Check if `FTP_SERVER_DIR` secret exists
3. If it doesn't exist, create it with one of these values:
   - If files are in `/public_html/trendtactics-digital/` → Set to: `/public_html/trendtactics-digital/`
   - If files are in `/public_html/trendtacticsdigital/` → Set to: `/public_html/trendtacticsdigital/`
   - If files are directly in `/public_html/` → Set to: `/public_html/` (or leave empty)

### Option 2: Rename Folder in cPanel

1. Log into cPanel
2. Go to File Manager
3. Navigate to `public_html/`
4. Rename `trendtactics-digital` folder to `trendtacticsdigital`
5. Update `FTP_SERVER_DIR` secret to: `/public_html/trendtacticsdigital/`

### Option 3: Move Files to Root (If Domain Points Directly to public_html)

If your domain `trendtacticsdigital.com` points directly to `public_html/`:

1. Move all files from `public_html/trendtactics-digital/` to `public_html/`
2. Delete the empty `trendtactics-digital` folder
3. Ensure `FTP_SERVER_DIR` is set to `/public_html/` or leave it empty

## Verify Deployment

After updating:

1. Make a small change and push to GitHub
2. Check GitHub Actions → Deploy to FTP workflow
3. Look for success message
4. Visit your website to verify changes are live

## Current Workflow Configuration

The workflow now:
- ✅ Validates all FTP secrets before deployment
- ✅ Uses `FTP_SERVER_DIR` secret if set, otherwise defaults to `/public_html/`
- ✅ Excludes unnecessary files (node_modules, .git, backend, frontend, etc.)
- ✅ Deploys only the static website files

## Troubleshooting

If deployment still fails:

1. **Check FTP Credentials**: Verify `FTP_SERVER`, `FTP_USERNAME`, and `FTP_PASSWORD` are correct
2. **Check Directory Path**: Verify `FTP_SERVER_DIR` matches your cPanel folder structure
3. **Check FTP Permissions**: Ensure the FTP user has write permissions to the target directory
4. **Check cPanel File Manager**: Verify the directory exists and is accessible
