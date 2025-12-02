const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // Basic Information
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    
    // Profile Information
    avatar: {
        type: String,
        default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    phone: {
        type: String,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    
    // Location
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    city: {
        type: String
    },
    timezone: {
        type: String,
        default: 'UTC'
    },
    
    // Subscription & Billing
    subscription: {
        plan: {
            type: String,
            enum: ['free', 'starter', 'professional', 'enterprise'],
            default: 'free'
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'cancelled', 'expired'],
            default: 'inactive'
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        stripeCustomerId: {
            type: String
        },
        stripeSubscriptionId: {
            type: String
        },
        autoRenew: {
            type: Boolean,
            default: true
        }
    },
    
    // Learning Progress
    enrolledCourses: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        completedModules: [{
            moduleId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Module'
            },
            completedAt: {
                type: Date,
                default: Date.now
            }
        }],
        lastAccessed: {
            type: Date,
            default: Date.now
        },
        certificates: [{
            certificateId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Certificate'
            },
            issuedAt: {
                type: Date,
                default: Date.now
            }
        }]
    }],
    
    // Learning Paths
    learningPaths: [{
        pathId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LearningPath'
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        completedCourses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }]
    }],
    
    // Achievements & Badges
    achievements: [{
        type: {
            type: String,
            enum: ['course_completion', 'module_completion', 'perfect_score', 'streak', 'certification', 'community_contribution']
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        icon: {
            type: String
        },
        earnedAt: {
            type: Date,
            default: Date.now
        },
        points: {
            type: Number,
            default: 0
        }
    }],
    
    // Learning Analytics
    learningStats: {
        totalTimeSpent: {
            type: Number,
            default: 0 // in minutes
        },
        coursesCompleted: {
            type: Number,
            default: 0
        },
        certificatesEarned: {
            type: Number,
            default: 0
        },
        averageScore: {
            type: Number,
            default: 0
        },
        streakDays: {
            type: Number,
            default: 0
        },
        lastActiveDate: {
            type: Date,
            default: Date.now
        }
    },
    
    // Preferences
    preferences: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        pushNotifications: {
            type: Boolean,
            default: true
        },
        marketingEmails: {
            type: Boolean,
            default: false
        },
        language: {
            type: String,
            default: 'en'
        },
        theme: {
            type: String,
            enum: ['light', 'dark', 'auto'],
            default: 'light'
        }
    },
    
    // Account Status
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpires: {
        type: Date
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    
    // Role & Permissions
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin', 'super_admin'],
        default: 'student'
    },
    permissions: [{
        type: String
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual for total points
userSchema.virtual('totalPoints').get(function() {
    return this.achievements.reduce((total, achievement) => total + achievement.points, 0);
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ 'subscription.status': 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'learningStats.lastActiveDate': -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update learning stats
userSchema.methods.updateLearningStats = function(stats) {
    this.learningStats = { ...this.learningStats, ...stats };
    this.learningStats.lastActiveDate = new Date();
    return this.save();
};

// Method to add achievement
userSchema.methods.addAchievement = function(achievement) {
    this.achievements.push(achievement);
    return this.save();
};

// Method to update course progress
userSchema.methods.updateCourseProgress = function(courseId, progress, completedModules = []) {
    const courseIndex = this.enrolledCourses.findIndex(
        enrollment => enrollment.courseId.toString() === courseId.toString()
    );
    
    if (courseIndex !== -1) {
        this.enrolledCourses[courseIndex].progress = progress;
        this.enrolledCourses[courseIndex].lastAccessed = new Date();
        
        if (completedModules.length > 0) {
            this.enrolledCourses[courseIndex].completedModules = completedModules;
        }
    }
    
    return this.save();
};

// Static method to get top learners
userSchema.statics.getTopLearners = function(limit = 10) {
    return this.aggregate([
        {
            $project: {
                fullName: { $concat: ['$firstName', ' ', '$lastName'] },
                email: 1,
                avatar: 1,
                totalPoints: {
                    $sum: '$achievements.points'
                },
                coursesCompleted: '$learningStats.coursesCompleted',
                totalTimeSpent: '$learningStats.totalTimeSpent'
            }
        },
        {
            $sort: { totalPoints: -1 }
        },
        {
            $limit: limit
        }
    ]);
};

module.exports = mongoose.model('User', userSchema); 