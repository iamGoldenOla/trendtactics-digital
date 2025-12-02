// Local development configuration
module.exports = {
    // Server Configuration
    NODE_ENV: 'development',
    PORT: 5001,
    CLIENT_URL: 'http://localhost:8000',

    // Database Configuration - Using Local MongoDB
    MONGODB_URI: 'mongodb://localhost:27017/trendtactics-lms',

    // JWT Configuration
    JWT_SECRET: 'trendtactics-lms-dev-secret-key-2025-change-in-production',
    JWT_EXPIRE: '30d',
    JWT_COOKIE_EXPIRE: 30,

    // Email Configuration (Optional for development)
    EMAIL_HOST: 'smtp.gmail.com',
    EMAIL_PORT: 587,
    EMAIL_USER: 'your-email@gmail.com',
    EMAIL_PASS: 'your-app-password',
    EMAIL_FROM: 'noreply@trendtacticsdigital.com',

    // File Upload Configuration
    MAX_FILE_SIZE: 10000000,
    UPLOAD_PATH: './uploads',

    // Security Configuration
    BCRYPT_ROUNDS: 12,
    RATE_LIMIT_WINDOW_MS: 900000,
    RATE_LIMIT_MAX_REQUESTS: 100,

    // Analytics Configuration
    ANALYTICS_ENABLED: true,
    TRACKING_ID: 'GA_MEASUREMENT_ID'
}; 