# Automatic Deployment Setup Guide

## 🚀 **How Automatic Deployment Works**

### **What Happens Automatically:**
1. **You push code to `main` branch** → GitHub Actions triggers automatically
2. **Workflow validates FTP secrets** → Checks if all required secrets are set
3. **Connects to your cPanel** → Uses FTP to upload files
4. **Deploys to `/public_html/`** → All files uploaded automatically
5. **Website updates** → No manual input needed!

---

## ⚙️ **Required Setup (One-Time)**

### **Step 1: Set GitHub Secrets**

Go to: **https://github.com/iamGoldenOla/trendtacticsdigital/settings/secrets/actions**

Click **"New repository secret"** and add these 4 secrets:

#### **1. FTP_SERVER**
- **Name:** `FTP_SERVER`
- **Value:** Your FTP server address
- **Examples:**
  - `ftp.yourdomain.com`
  - `yourdomain.com`
  - `IP_ADDRESS` (if you have it)

#### **2. FTP_USERNAME**
- **Name:** `FTP_USERNAME`
- **Value:** Your cPanel FTP username
- **Example:** `yourusername` or `yourdomain_username`

#### **3. FTP_PASSWORD**
- **Name:** `FTP_PASSWORD`
- **Value:** Your cPanel FTP password
- **Note:** This is your cPanel FTP password (not cPanel login password)

#### **4. FTP_SERVER_DIR** (Optional)
- **Name:** `FTP_SERVER_DIR`
- **Value:** `/public_html/`
- **Note:** If not set, defaults to `/public_html/`

---

## 🔍 **How to Find Your FTP Credentials**

### **In cPanel:**

1. **Log into cPanel**
2. **Go to "FTP Accounts"** (under Files section)
3. **Find your FTP account** or create one
4. **Click "Configure FTP Client"**
5. **You'll see:**
   - **Server:** `ftp.yourdomain.com` or `yourdomain.com`
   - **Username:** Your FTP username
   - **Password:** Your FTP password
   - **Port:** Usually `21`

**Use these values for GitHub Secrets!**

---

## ✅ **After Setup - It's Automatic!**

Once secrets are set:

1. **Make changes** to your code
2. **Commit and push** to `main` branch:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. **GitHub Actions runs automatically** (check Actions tab)
4. **Files deploy to cPanel** automatically
5. **Website updates** - No manual steps needed!

---

## 🔍 **Troubleshooting**

### **If Deployment Fails:**

1. **Check GitHub Actions Logs:**
   - Go to: **Actions** tab in GitHub
   - Click on the failed workflow
   - Check the error messages

2. **Common Issues:**

   **❌ "FTP_SERVER secret is not set"**
   - **Fix:** Add `FTP_SERVER` secret in GitHub Settings

   **❌ "Connection timeout"**
   - **Fix:** Check FTP server address is correct
   - Try using IP address instead of domain

   **❌ "Authentication failed"**
   - **Fix:** Check FTP username and password are correct
   - Make sure you're using FTP password, not cPanel password

   **❌ "Directory not found"**
   - **Fix:** Verify directory path is `/public_html/`
   - Some hosts use `/public_html/domain.com/` for addon domains

3. **Test FTP Connection:**
   - Use an FTP client (FileZilla) to test connection
   - If it works in FileZilla, it should work in GitHub Actions

---

## 📋 **Workflow Features**

✅ **Automatic on Push** - Deploys when you push to `main`  
✅ **Secret Validation** - Checks if all secrets are set before deploying  
✅ **Error Handling** - Clear error messages if deployment fails  
✅ **File Listing** - Shows what files will be deployed  
✅ **Deployment Summary** - Shows what was deployed  
✅ **Timeout Protection** - Stops after 10 minutes if stuck  

---

## 🎯 **Directory Configuration**

**Your Directory:** `/public_html/`

This is set in the workflow as:
```yaml
server-dir: ${{ secrets.FTP_SERVER_DIR || '/public_html/' }}
```

**If you need a different directory:**
- Set `FTP_SERVER_DIR` secret to your custom path
- Example: `/public_html/subdomain/` for subdomains

---

## 📝 **Quick Checklist**

- [ ] Set `FTP_SERVER` secret
- [ ] Set `FTP_USERNAME` secret
- [ ] Set `FTP_PASSWORD` secret
- [ ] (Optional) Set `FTP_SERVER_DIR` to `/public_html/`
- [ ] Push code to `main` branch
- [ ] Check Actions tab - workflow should run automatically
- [ ] Verify files are uploaded to cPanel

---

## 🚀 **Test Deployment**

1. **Make a small change** (add a comment to a file)
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. **Go to Actions tab** - Watch the workflow run
4. **Check your website** - Should update automatically!

---

**Once secrets are set, deployment is 100% automatic!** 🎉

---

**Last Updated:** December 2024

