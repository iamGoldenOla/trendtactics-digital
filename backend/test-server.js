const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Course = require('./models/Course');

// Test database connection
const testConnection = async () => {
    try {
        console.log('🔗 Testing MongoDB connection...');
        console.log('📍 Using URI from config.js');
        
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connection successful');
        
        // Test User model
        console.log('✅ User model loaded successfully');
        
        // Test Course model
        console.log('✅ Course model loaded successfully');
        
        // Test basic operations
        const userCount = await User.countDocuments();
        console.log(`📊 Current users in database: ${userCount}`);
        
        const courseCount = await Course.countDocuments();
        console.log(`📊 Current courses in database: ${courseCount}`);
        
        await mongoose.connection.close();
        console.log('✅ Database connection closed');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('💡 Make sure your MongoDB Atlas connection string is correct');
        console.log('💡 Check if your IP is whitelisted in MongoDB Atlas');
        process.exit(1);
    }
};

// Run test
testConnection(); 