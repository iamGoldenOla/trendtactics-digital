# 🚀 LMS Backend Startup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (local or MongoDB Atlas)
3. **Git**

## Quick Start

### 1. Environment Setup

Copy the environment example file and configure it:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:8000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/trendtactics-lms

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@trendtacticsdigital.com
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `trendtactics-lms`

#### Option B: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 5. Test the Server

```bash
# Test database connection
node test-server.js

# Test API endpoints
curl http://localhost:5000/health
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Forgot password
- `PUT /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/resend-verification` - Resend verification email

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/category/:category` - Get courses by category
- `GET /api/courses/search` - Search courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Instructor/Admin)
- `PUT /api/courses/:id` - Update course (Instructor/Admin)
- `DELETE /api/courses/:id` - Delete course (Instructor/Admin)
- `GET /api/courses/instructor/my-courses` - Get instructor courses
- `GET /api/courses/:id/stats` - Get course statistics

## Database Models

### User Model
- Authentication & profile information
- Role-based access (student, instructor, admin)
- Learning progress tracking
- Subscription management

### Course Model
- Course content and structure
- Pricing and access control
- Analytics and statistics
- SEO and marketing features

### Enrollment Model
- Student-course relationships
- Progress tracking
- Quiz and assignment results
- Learning analytics

## Features Implemented

✅ **Authentication System**
- JWT-based authentication
- Email verification
- Password reset
- Role-based access control

✅ **Course Management**
- CRUD operations for courses
- Module and lesson structure
- File uploads and attachments
- Course publishing workflow

✅ **User Management**
- User registration and profiles
- Role management
- Learning progress tracking
- Analytics and reporting

✅ **Security Features**
- Input validation and sanitization
- Rate limiting
- CORS protection
- XSS and injection prevention

✅ **Email System**
- Transactional emails
- HTML templates
- Email verification
- Password reset emails

## Next Steps

### Phase 2: Advanced Features
1. **Payment Integration** (Stripe)
2. **File Upload System** (Cloudinary/AWS S3)
3. **Real-time Features** (Socket.io)
4. **Analytics Dashboard**
5. **Certificate Generation**

### Phase 3: Frontend Integration
1. **API Integration** with frontend
2. **State Management**
3. **Real-time Updates**
4. **Progressive Web App**

### Phase 4: Production Deployment
1. **Environment Configuration**
2. **Database Optimization**
3. **Security Hardening**
4. **Monitoring and Logging**

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string
   - Check network connectivity

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure proper token format

3. **Email Not Sending**
   - Verify email credentials
   - Check SMTP settings
   - Enable "Less secure apps" for Gmail

4. **CORS Errors**
   - Verify CLIENT_URL in .env
   - Check CORS configuration
   - Ensure proper headers

### Development Tips

1. **Use MongoDB Compass** for database visualization
2. **Use Postman** for API testing
3. **Enable debug logging** in development
4. **Use nodemon** for auto-restart during development

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review error logs
3. Test with minimal configuration
4. Create detailed bug reports

---

**Happy Coding! 🎓** 