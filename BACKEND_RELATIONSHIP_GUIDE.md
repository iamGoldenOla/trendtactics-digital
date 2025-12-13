# 🔄 Backend Relationship Guide

This guide explains how the three components of your ecosystem relate to each other in terms of backend architecture.

## 🏗️ Current Architecture Overview

```
┌─────────────────────────────────────┐    ┌─────────────────────────────────────┐
│         Main Website Backend        │    │        Academy Backend              │
│    (https://wtgwxnhnqdnbzpetltrt.   │    │    (https://YOUR_ACADEMY_PROJECT.   │
│            supabase.co)             │    │             supabase.co)            │
├─────────────────────────────────────┤    ├─────────────────────────────────────┤
│                                     │    │                                     │
│  ┌─────────────────────────────┐    │    │  ┌─────────────────────────────┐    │
│  │      Trendtactics.com       │    │    │  │    Trendtactics Academy     │    │
│  │  (Marketing & Services)     │    │    │  │    (Learning Platform)      │    │
│  └─────────────────────────────┘    │    │  └─────────────────────────────┘    │
│                                     │    │                                     │
│  ┌─────────────────────────────┐    │    │  ┌─────────────────────────────┐    │
│  │        Trendy AI            │    │    │  │      Course Catalog         │    │
│  │   (Automation Engine)       │    │    │  │   (Courses, Modules,        │    │
│  └─────────────────────────────┘    │    │  │    Lessons, Quizzes)        │    │
│                                     │    │  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │    │                                     │
│  │    User Authentication      │    │    │  ┌─────────────────────────────┐    │
│  │   (Shared with Academy)     │    │    │  │      Enrollments            │    │
│  └─────────────────────────────┘    │    │  │  (Student Progress &        │    │
│                                     │    │  │      Certificates)          │    │
│  ┌─────────────────────────────┐    │    │  └─────────────────────────────┘    │
│  │       Blog System           │    │    │                                     │
│  └─────────────────────────────┘    │    │  ┌─────────────────────────────┐    │
│                                     │    │  │      User Profiles          │    │
│  ┌─────────────────────────────┐    │    │  │   (Extended for Learning)   │    │
│  │      Contact Forms          │    │    │  └─────────────────────────────┘    │
│  └─────────────────────────────┘    │    │                                     │
└─────────────────────────────────────┘    └─────────────────────────────────────┘
```

## 🔗 Integration Points

### 1. **Shared Authentication**
- Both backends use the same authentication system
- Users can log in to both the main website and Academy with the same credentials
- User profiles are synchronized between systems

### 2. **Data Flow**
```
User Activity (Main Website) → Authentication → Academy Access
                   ↓
            Trendy AI Automation ←→ Academy Progress Tracking
```

### 3. **API Bridge**
- The Academy frontend communicates with its dedicated backend
- The main website frontend communicates with its shared backend
- Both can access user authentication information

## 📊 Database Separation

### Main Website + Trendy AI Backend
**Project URL**: `https://wtgwxnhnqdnbzpetltrt.supabase.co`

**Tables**:
- `users` - User accounts and basic profiles
- `profiles` - Extended user information
- `blog_posts` - Blog content
- `newsletter_subscribers` - Email list
- `quiz_results` - Growth quiz responses
- `contact_messages` - Contact form submissions

### Academy Backend
**Project URL**: `https://YOUR_ACADEMY_PROJECT.supabase.co`

**Tables**:
- `courses` - Course catalog
- `modules` - Course structure
- `lessons` - Individual learning units
- `enrollments` - Student progress tracking
- `quiz_questions` - Assessment questions
- `quiz_attempts` - Student quiz results
- `certificates` - Course completion certificates

## 🔐 Security & Access Control

### Main Website Backend
- Public read access to blog posts and marketing content
- Authenticated write access for user actions
- Admin-only access for sensitive operations

### Academy Backend
- Public read access to published courses
- Authenticated access to enrollments and progress
- Instructor/admin access to course management
- Student access to their own learning data

## 🚀 Deployment Independence

### Benefits of Separation
1. **Independent Scaling**: Academy can scale separately based on student load
2. **Fault Isolation**: Issues in one backend don't affect the other
3. **Billing Separation**: Clear cost allocation between marketing and education
4. **Team Independence**: Different teams can work on each backend
5. **Technology Flexibility**: Each backend can evolve independently

### Integration Mechanisms
1. **Shared Authentication**: Same Supabase Auth provider
2. **Cross-System APIs**: REST APIs for data exchange
3. **Webhooks**: Event-driven communication
4. **Scheduled Sync**: Periodic data synchronization

## 🧪 Testing Strategy

### Main Website Testing
```bash
# Test main website functions
curl https://wtgwxnhnqdnbzpetltrt.supabase.co/rest/v1/blog_posts?select=*

# Test authentication
curl -X POST https://wtgwxnhnqdnbzpetltrt.supabase.co/auth/v1/signup \
  -H "apikey: YOUR_MAIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securepassword"}'
```

### Academy Testing
```bash
# Test Academy functions (after deployment)
curl https://YOUR_ACADEMY_PROJECT.supabase.co/rest/v1/courses?select=*

# Test enrollment function
curl -X POST https://YOUR_ACADEMY_PROJECT.functions.supabase.co/enroll \
  -H "Authorization: Bearer USER_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"courseId":"COURSE_UUID"}'
```

## 🛠️ Maintenance Guidelines

### When to Update Main Backend
- Marketing website changes
- Blog system updates
- Contact form enhancements
- Trendy AI automation improvements

### When to Update Academy Backend
- New course content
- Learning feature additions
- Assessment system updates
- Certificate generation improvements

### Coordinated Updates
- User profile schema changes
- Authentication flow modifications
- Branding updates
- Security patches

## 📈 Monitoring & Analytics

### Main Website Metrics
- Website traffic and engagement
- Contact form submissions
- Blog post performance
- Quiz completion rates

### Academy Metrics
- Course enrollment rates
- Student completion rates
- Quiz performance
- Certificate issuance

### Cross-System Metrics
- User journey from marketing to learning
- Conversion rates from website to Academy
- Trendy AI effectiveness in driving engagement

## 🆘 Troubleshooting

### Authentication Issues
1. Verify both backends use the same Auth provider
2. Check user migration status
3. Ensure JWT tokens are valid for both systems

### Data Sync Problems
1. Check API bridge connectivity
2. Verify webhook configurations
3. Review scheduled sync jobs

### Performance Issues
1. Monitor each backend separately
2. Check cross-system API calls
3. Optimize database queries independently

## 🎯 Best Practices

1. **Maintain Clear Boundaries**: Keep data separated except where integration is required
2. **Document Integration Points**: Clearly define how systems communicate
3. **Plan Coordinated Releases**: Schedule updates that affect both systems carefully
4. **Monitor Both Systems**: Set up alerts for both backends independently
5. **Test Integrations**: Regularly test the connection between systems
6. **Version APIs**: Use versioning for cross-system APIs
7. **Handle Failures Gracefully**: Design fallback mechanisms for integration points

This architecture provides the flexibility and scalability needed for your growing digital ecosystem while maintaining the integration necessary for a cohesive user experience.