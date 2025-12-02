const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
    try {
        let token;

        // Check for token in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // Check for token in cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. User not found.'
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated. Please contact support.'
            });
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }
        
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

// Role-based authorization
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Please login.'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. ${req.user.role} role is not authorized to access this resource.`
            });
        }

        next();
    };
};

// Check if user is instructor of the course
const authorizeInstructor = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const Course = require('../models/Course');
        
        const course = await Course.findById(courseId);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found.'
            });
        }

        // Check if user is the instructor or co-instructor
        const isInstructor = course.instructor.toString() === req.user._id.toString();
        const isCoInstructor = course.coInstructors.some(
            coInstructor => coInstructor.toString() === req.user._id.toString()
        );

        if (!isInstructor && !isCoInstructor && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Only course instructors can perform this action.'
            });
        }

        req.course = course;
        next();
    } catch (error) {
        console.error('Instructor authorization error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

// Check if user is enrolled in the course
const authorizeEnrolled = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const Enrollment = require('../models/Enrollment');
        
        const enrollment = await Enrollment.findOne({
            student: req.user._id,
            course: courseId,
            status: { $in: ['active', 'completed'] }
        });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You must be enrolled in this course to access this resource.'
            });
        }

        req.enrollment = enrollment;
        next();
    } catch (error) {
        console.error('Enrollment authorization error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            
            if (user && user.isActive) {
                req.user = user;
            }
        }

        next();
    } catch (error) {
        // Don't fail on token errors for optional auth
        next();
    }
};

// Rate limiting for authentication endpoints
const authRateLimit = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many authentication attempts. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
};

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id);

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    // Remove password from response
    user.password = undefined;

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user
        });
};

module.exports = {
    authenticateToken,
    authorize,
    authorizeInstructor,
    authorizeEnrolled,
    optionalAuth,
    authRateLimit,
    generateToken,
    sendTokenResponse
}; 