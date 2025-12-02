# 🗄️ MongoDB Setup for Local Development

## Option 1: MongoDB Atlas (Recommended - No Installation Required)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Choose "Free" tier (M0)

### 2. Create Cluster
1. Click "Build a Database"
2. Choose "FREE" tier
3. Select cloud provider (AWS/Google Cloud/Azure)
4. Choose region closest to you
5. Click "Create"

### 3. Set Up Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Select "Read and write to any database"
6. Click "Add User"

### 4. Set Up Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `trendtactics-lms`

### 6. Update Configuration
Update your `backend/config.js`:
```javascript
MONGODB_URI: 'mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/trendtactics-lms'
```

## Option 2: Local MongoDB Installation

### Windows Installation

#### Method A: MongoDB Community Server
1. Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run installer
3. Choose "Complete" installation
4. Install MongoDB Compass (GUI tool)
5. Start MongoDB service

#### Method B: Using Chocolatey
```bash
choco install mongodb
```

#### Method C: Using Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### macOS Installation

#### Method A: Using Homebrew
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Method B: Using Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Linux Installation

#### Ubuntu/Debian
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Testing Your Setup

### 1. Test Connection
```bash
# Run the test script
node backend/test-server.js
```

### 2. Expected Output
```
✅ MongoDB connection successful
✅ User model loaded successfully
✅ Course model loaded successfully
📊 Current users in database: 0
📊 Current courses in database: 0
✅ Database connection closed
```

### 3. Start Backend Server
```bash
npm run backend:dev
```

### 4. Test API
```bash
# Test health endpoint
curl http://localhost:5000/health

# Expected response:
{
  "success": true,
  "message": "Trendtactics LMS Backend is running! 🎓",
  "timestamp": "2025-01-28T...",
  "environment": "development",
  "version": "1.0.0",
  "features": [...]
}
```

## Troubleshooting

### Connection Refused Error
- Make sure MongoDB is running
- Check if port 27017 is available
- Verify firewall settings

### Authentication Error
- Check username/password in connection string
- Ensure database user has correct permissions
- Verify network access settings (for Atlas)

### Permission Denied
- Run MongoDB with appropriate permissions
- Check file system permissions for data directory

## Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Set up MongoDB (choose one option above)

# 3. Test database connection
node backend/test-server.js

# 4. Start backend server
npm run backend:dev

# 5. Test API
curl http://localhost:5000/health
```

## Next Steps

Once MongoDB is connected:
1. ✅ Backend server will start successfully
2. ✅ API endpoints will be available
3. ✅ You can test user registration and login
4. ✅ Course management will work
5. 🔄 Ready to integrate with frontend!

---

**Need help?** Check the error messages in the console - they usually provide specific guidance for fixing connection issues. 