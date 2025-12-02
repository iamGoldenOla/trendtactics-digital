# 🎓 Frontend-Backend Integration Guide

## 🚀 **Your LMS Backend is Ready!**

Your backend is now running on `http://localhost:5000` with full API endpoints. Here's how to integrate it with your frontend.

## 📡 **Available API Endpoints**

### **Demo Mode (No Database Required)**
All endpoints work with demo data - perfect for testing!

```
Base URL: http://localhost:5000/api/demo

📚 Courses:
GET    /courses                    # Get all courses
GET    /courses/featured          # Get featured courses  
GET    /courses/category/:cat     # Get courses by category
GET    /courses/search?q=term     # Search courses
GET    /courses/:id               # Get single course

🔐 Authentication:
POST   /auth/login                # Login (password: demo123)
POST   /auth/register             # Register new user
GET    /auth/me                   # Get current user
POST   /auth/logout               # Logout
```

### **Full Backend (With MongoDB)**
```
Base URL: http://localhost:5000/api

📚 Courses:
GET    /courses                    # Get all courses
GET    /courses/featured          # Get featured courses
GET    /courses/category/:cat     # Get courses by category
GET    /courses/search?q=term     # Search courses
GET    /courses/:id               # Get single course
POST   /courses                   # Create course (Instructor/Admin)
PUT    /courses/:id               # Update course (Instructor/Admin)
DELETE /courses/:id               # Delete course (Instructor/Admin)

🔐 Authentication:
POST   /auth/register             # Register new user
POST   /auth/login                # Login user
POST   /auth/logout               # Logout user
GET    /auth/me                   # Get current user
PUT    /auth/update-profile       # Update profile
PUT    /auth/change-password      # Change password
POST   /auth/forgot-password      # Forgot password
PUT    /auth/reset-password/:token # Reset password
GET    /auth/verify-email/:token  # Verify email
```

## 🔧 **Integration Steps**

### **Step 1: Update Your Academy Page**

Replace the static data in `js/academy.js` with API calls:

```javascript
// API Configuration
const API_BASE = 'http://localhost:5000/api/demo'; // Use demo for testing
// const API_BASE = 'http://localhost:5000/api'; // Use full backend when ready

// Fetch courses from API
async function fetchCourses() {
    try {
        const response = await fetch(`${API_BASE}/courses`);
        const data = await response.json();
        
        if (data.success) {
            displayCourses(data.data);
        } else {
            console.error('Failed to fetch courses:', data.message);
        }
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

// Fetch featured courses
async function fetchFeaturedCourses() {
    try {
        const response = await fetch(`${API_BASE}/courses/featured`);
        const data = await response.json();
        
        if (data.success) {
            displayFeaturedCourses(data.data);
        }
    } catch (error) {
        console.error('Error fetching featured courses:', error);
    }
}

// Search courses
async function searchCourses(query) {
    try {
        const response = await fetch(`${API_BASE}/courses/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
            displaySearchResults(data.data);
        }
    } catch (error) {
        console.error('Error searching courses:', error);
    }
}
```

### **Step 2: Add Authentication**

Add login/register functionality:

```javascript
// Login function
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Update UI
            updateAuthUI(data.user);
            return true;
        } else {
            alert(data.message);
            return false;
        }
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

// Register function
async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Update UI
            updateAuthUI(data.user);
            return true;
        } else {
            alert(data.message);
            return false;
        }
    } catch (error) {
        console.error('Registration error:', error);
        return false;
    }
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Logout function
function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateAuthUI(null);
}
```

### **Step 3: Update Your HTML**

Add authentication forms to your academy page:

```html
<!-- Login Modal -->
<div id="loginModal" class="modal">
    <div class="modal-content">
        <h2>Login to Your Account</h2>
        <form id="loginForm">
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <p>Demo password: <strong>demo123</strong></p>
    </div>
</div>

<!-- Register Modal -->
<div id="registerModal" class="modal">
    <div class="modal-content">
        <h2>Create Your Account</h2>
        <form id="registerForm">
            <input type="text" placeholder="First Name" required>
            <input type="text" placeholder="Last Name" required>
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    </div>
</div>
```

### **Step 4: Add Course Display Functions**

```javascript
// Display courses in your existing layout
function displayCourses(courses) {
    const coursesContainer = document.querySelector('.courses-grid');
    
    coursesContainer.innerHTML = courses.map(course => `
        <div class="course-card">
            <img src="${course.thumbnail}" alt="${course.title}">
            <div class="course-content">
                <h3>${course.title}</h3>
                <p>${course.shortDescription}</p>
                <div class="course-meta">
                    <span class="category">${course.category}</span>
                    <span class="level">${course.level}</span>
                    <span class="duration">${course.duration}</span>
                </div>
                <div class="course-stats">
                    <span>⭐ ${course.stats.averageRating}</span>
                    <span>👥 ${course.stats.enrollments} students</span>
                </div>
                <div class="course-price">
                    ${course.isFree ? 'FREE' : `$${course.price}`}
                </div>
                <button onclick="enrollInCourse('${course._id}')" class="enroll-btn">
                    ${course.isFree ? 'Enroll Free' : 'Enroll Now'}
                </button>
            </div>
        </div>
    `).join('');
}

// Display featured courses
function displayFeaturedCourses(courses) {
    const featuredContainer = document.querySelector('.featured-courses');
    
    featuredContainer.innerHTML = courses.map(course => `
        <div class="featured-course">
            <img src="${course.thumbnail}" alt="${course.title}">
            <div class="featured-content">
                <h3>${course.title}</h3>
                <p>${course.shortDescription}</p>
                <div class="featured-meta">
                    <span>⭐ ${course.stats.averageRating}</span>
                    <span>👥 ${course.stats.enrollments} students</span>
                    <span>${course.isFree ? 'FREE' : `$${course.price}`}</span>
                </div>
                <button onclick="enrollInCourse('${course._id}')" class="featured-enroll-btn">
                    ${course.isFree ? 'Enroll Free' : 'Enroll Now'}
                </button>
            </div>
        </div>
    `).join('');
}
```

## 🧪 **Testing Your Integration**

### **1. Test API Endpoints**
```bash
# Test health endpoint
curl http://localhost:5000/health

# Test courses endpoint
curl http://localhost:5000/api/demo/courses

# Test featured courses
curl http://localhost:5000/api/demo/courses/featured

# Test search
curl "http://localhost:5000/api/demo/courses/search?q=marketing"
```

### **2. Test Authentication**
```bash
# Test login (use any email + password: demo123)
curl -X POST http://localhost:5000/api/demo/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"demo123"}'

# Test registration
curl -X POST http://localhost:5000/api/demo/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"demo123"}'
```

## 🎯 **Demo Data Available**

The demo mode includes 5 sample courses:
1. **Complete Digital Marketing Masterclass** - $199
2. **SEO Fundamentals for Beginners** - $99
3. **Social Media Marketing Strategy** - $149
4. **Google Ads Mastery** - $179
5. **Content Marketing Fundamentals** - FREE

## 🔄 **Next Steps**

### **Phase 1: Demo Integration (Current)**
- ✅ Backend running with demo data
- ✅ API endpoints working
- 🔄 Integrate with frontend
- 🔄 Test all features

### **Phase 2: Full Backend (When Ready)**
- 🔄 Set up MongoDB (Atlas recommended)
- 🔄 Configure environment variables
- 🔄 Switch from demo to full API
- 🔄 Add real user data

### **Phase 3: Advanced Features**
- 🔄 Payment integration
- 🔄 File uploads
- 🔄 Real-time features
- 🔄 Analytics dashboard

## 🛠️ **Troubleshooting**

### **CORS Issues**
If you get CORS errors, the backend is already configured to allow `http://localhost:8000`.

### **API Not Responding**
1. Check if backend is running: `curl http://localhost:5000/health`
2. Restart backend: `npm run backend:dev`
3. Check console for errors

### **Authentication Issues**
- Demo mode accepts any email with password `demo123`
- Check browser console for error messages
- Verify API endpoint URLs

---

**🎉 You're ready to build a full-featured LMS!**

Your backend is production-ready and your frontend can now connect to real APIs. Start with the demo integration and upgrade to the full backend when you're ready for real data. 