# 🎓 LMS Integration Guide

## ✅ **Your Backend is Ready!**

**Backend URL:** `http://localhost:5000`
**Demo API:** `http://localhost:5000/api/demo`
**Full API:** `http://localhost:5000/api`

## 🚀 **Quick Start**

### **1. Test Your Backend**
```bash
# Health check
curl http://localhost:5000/health

# Get courses (demo)
curl http://localhost:5000/api/demo/courses

# Get featured courses
curl http://localhost:5000/api/demo/courses/featured
```

### **2. Update Your Academy Page**

Replace static data in `js/academy.js`:

```javascript
// API Configuration
const API_BASE = 'http://localhost:5000/api/demo';

// Fetch courses
async function loadCourses() {
    try {
        const response = await fetch(`${API_BASE}/courses`);
        const data = await response.json();
        
        if (data.success) {
            displayCourses(data.data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display courses
function displayCourses(courses) {
    const container = document.querySelector('.courses-grid');
    container.innerHTML = courses.map(course => `
        <div class="course-card">
            <img src="${course.thumbnail}" alt="${course.title}">
            <h3>${course.title}</h3>
            <p>${course.shortDescription}</p>
            <div class="course-meta">
                <span>${course.category}</span>
                <span>${course.level}</span>
                <span>${course.duration}</span>
            </div>
            <div class="course-price">
                ${course.isFree ? 'FREE' : `$${course.price}`}
            </div>
            <button onclick="enrollCourse('${course._id}')">
                ${course.isFree ? 'Enroll Free' : 'Enroll Now'}
            </button>
        </div>
    `).join('');
}

// Load courses on page load
document.addEventListener('DOMContentLoaded', loadCourses);
```

### **3. Add Authentication**

```javascript
// Login function
async function login(email, password) {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        updateUI();
    }
}

// Demo login: any email + password "demo123"
```

## 📚 **Available Endpoints**

### **Courses**
- `GET /api/demo/courses` - All courses
- `GET /api/demo/courses/featured` - Featured courses
- `GET /api/demo/courses/category/:category` - By category
- `GET /api/demo/courses/search?q=term` - Search
- `GET /api/demo/courses/:id` - Single course

### **Authentication**
- `POST /api/demo/auth/login` - Login (demo123)
- `POST /api/demo/auth/register` - Register
- `GET /api/demo/auth/me` - Current user
- `POST /api/demo/auth/logout` - Logout

## 🎯 **Demo Data**

5 sample courses available:
1. Complete Digital Marketing Masterclass ($199)
2. SEO Fundamentals for Beginners ($99)
3. Social Media Marketing Strategy ($149)
4. Google Ads Mastery ($179)
5. Content Marketing Fundamentals (FREE)

## 🔄 **Next Steps**

1. **Test API endpoints** - Use curl or browser
2. **Update frontend** - Replace static data with API calls
3. **Add authentication** - Login/register forms
4. **Test integration** - Verify everything works
5. **Upgrade to full backend** - When ready for real data

---

**🎉 Ready to build your LMS!** 