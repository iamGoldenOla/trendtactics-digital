# 🎓 Trendtactics Digital Academy - Backend

A comprehensive Learning Management System (LMS) backend built with Node.js, Express, and MongoDB.

## 🏗️ Architecture

```
backend/
├── models/           # Database models
│   ├── User.js      # User authentication & profiles
│   ├── Course.js    # Course management
│   └── Enrollment.js # Student enrollments & progress
├── routes/           # API routes
│   ├── auth.js      # Authentication endpoints
│   └── courses.js   # Course management endpoints
├── middleware/       # Custom middleware
│   ├── auth.js      # JWT authentication
│   └── errorHandler.js # Error handling
├── utils/           # Utility functions
│   └── sendEmail.js # Email service
├── server.js        # Main server file
├── test-server.js   # Database connection test
└── startup-guide.md # Setup instructions
```

## 🚀 Features

### ✅ Core Features
- **User Authentication** - JWT-based auth with email verification
- **Course Management** - Full CRUD operations for courses
- **Enrollment System** - Student course enrollments and progress tracking
- **Role-Based Access** - Student, Instructor, and Admin roles
- **Email System** - Transactional emails with HTML templates

### ✅ Security Features
- **Input Validation** - Express-validator for request validation
- **Rate Limiting** - Protection against brute force attacks
- **CORS Protection** - Cross-origin resource sharing configuration
- **XSS Prevention** - Input sanitization and output encoding
- **MongoDB Sanitization** - Protection against NoSQL injection
- **Helmet.js** - Security headers and CSP

### ✅ Database Models

#### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: ['student', 'instructor', 'admin'],
  isEmailVerified: Boolean,
  profile: {
    avatar: String,
    bio: String,
    phone: String,
    country: String,
    city: String
  },
  learningProgress: {
    completedCourses: Number,
    totalTimeSpent: Number,
    certificates: Array
  }
}
```

#### Course Model
```javascript
{
  title: String,
  slug: String (unique),
  description: String,
  category: String,
  level: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  price: Number,
  instructor: ObjectId (ref: User),
  modules: [{
    title: String,
    lessons: [{
      title: String,
      type: ['video', 'text', 'quiz', 'assignment'],
      content: String,
      videoUrl: String,
      duration: Number
    }]
  }],
  stats: {
    enrollments: Number,
    completions: Number,
    averageRating: Number
  }
}
```

#### Enrollment Model
```javascript
{
  student: ObjectId (ref: User),
  course: ObjectId (ref: Course),
  progress: Number (0-100),
  completedLessons: Array,
  quizResults: Array,
  assignments: Array,
  learningAnalytics: {
    totalTimeSpent: Number,
    averageSessionDuration: Number,
    engagementScore: Number
  }
}
```

## 🔧 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Private |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/update-profile` | Update profile | Private |
| PUT | `/api/auth/change-password` | Change password | Private |
| POST | `/api/auth/forgot-password` | Forgot password | Public |
| PUT | `/api/auth/reset-password/:token` | Reset password | Public |
| GET | `/api/auth/verify-email/:token` | Verify email | Public |

### Courses
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/courses` | Get all courses | Public |
| GET | `/api/courses/featured` | Get featured courses | Public |
| GET | `/api/courses/category/:category` | Get courses by category | Public |
| GET | `/api/courses/search` | Search courses | Public |
| GET | `/api/courses/:id` | Get single course | Public |
| POST | `/api/courses` | Create course | Instructor/Admin |
| PUT | `/api/courses/:id` | Update course | Instructor/Admin |
| DELETE | `/api/courses/:id` | Delete course | Instructor/Admin |

## 🛠️ Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Database Setup**
   - Local MongoDB or MongoDB Atlas
   - Update `MONGODB_URI` in `.env`

4. **Start Development Server**
   ```bash
   npm run backend:dev
   ```

5. **Test Database Connection**
   ```bash
   npm run test:backend
   ```

## 🔒 Security

### JWT Authentication
- Token-based authentication
- Configurable expiration times
- Secure cookie storage
- Role-based authorization

### Input Validation
- Request body validation
- Parameter sanitization
- SQL injection prevention
- XSS protection

### Rate Limiting
- API endpoint protection
- Configurable limits
- IP-based tracking

## 📧 Email System

### Templates Available
- **Email Verification** - Welcome and verification emails
- **Password Reset** - Secure password reset flow
- **Welcome Email** - New user onboarding
- **Course Enrollment** - Enrollment confirmations
- **Course Completion** - Certificate notifications

### Configuration
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@trendtacticsdigital.com
```

## 🧪 Testing

### Database Connection Test
```bash
node test-server.js
```

### API Testing
Use tools like Postman or curl:
```bash
# Health check
curl http://localhost:5000/health

# Get courses
curl http://localhost:5000/api/courses
```

## 📊 Analytics & Monitoring

### Built-in Analytics
- Course enrollment tracking
- Student progress monitoring
- Learning analytics
- Completion rates
- Engagement metrics

### Performance Monitoring
- Request/response logging
- Error tracking
- Database query optimization
- Memory usage monitoring

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB Atlas
- [ ] Set up email service
- [ ] Configure CORS origins
- [ ] Set secure JWT secret
- [ ] Enable HTTPS
- [ ] Set up monitoring

### Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secure-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🔮 Future Enhancements

### Phase 2 Features
- [ ] Payment integration (Stripe)
- [ ] File upload system (Cloudinary/AWS S3)
- [ ] Real-time features (Socket.io)
- [ ] Advanced analytics dashboard
- [ ] Certificate generation
- [ ] Discussion forums
- [ ] Live streaming capabilities

### Phase 3 Features
- [ ] Mobile app API
- [ ] Advanced reporting
- [ ] AI-powered recommendations
- [ ] Gamification system
- [ ] Multi-language support
- [ ] Advanced search with filters

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ by Trendtactics Digital Academy** 