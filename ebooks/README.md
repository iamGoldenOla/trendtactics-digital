# Ebooks Directory

## Important Notice

This directory contains PDF files that are **NOT** tracked by Git to prevent upload issues to GitHub. The files are stored locally for development purposes only.

## Storage Strategy

- **Local Development**: PDF files are kept here for local testing
- **Production**: Ebooks are served from external storage (Google Drive, Dropbox, etc.)
- **Git Tracking**: All PDF files are ignored by `.gitignore` to prevent large file uploads

## File Management

1. **Adding New Ebooks**: 
   - Place PDF files in this directory for local testing
   - Update `data/content.json` with external download links
   - Files will be automatically ignored by Git

2. **External Storage**:
   - Upload PDFs to Google Drive, Dropbox, or similar service
   - Use direct download links in `content.json`
   - Set `"external": true` for external files

3. **File Size Limits**:
   - Keep individual files under 10MB for better performance
   - Total directory size should stay under 50MB

## Current Files

The following files are stored locally but not tracked by Git:
- Various business, motivational, and inspirational ebooks
- All files are under 1MB each
- Total size: ~10MB

## Deployment

When deploying to production:
1. Upload PDFs to external storage
2. Update download links in `content.json`
3. Remove local PDF files if desired
4. Commit changes to Git

This approach ensures:
- ✅ No upload issues to GitHub
- ✅ Fast website loading
- ✅ Reliable file access
- ✅ Easy maintenance 