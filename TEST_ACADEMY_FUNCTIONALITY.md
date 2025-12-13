# 🧪 Testing Academy Functionality

This guide will help you test all aspects of your newly deployed Academy backend.

## 📋 Prerequisites

1. ✅ Supabase Edge Functions deployed
2. ✅ Sample courses added to database
3. ✅ Academy page accessible
4. ✅ User account for testing

## 🎯 Test Areas

### 1. Course Listing
**Objective**: Verify courses display correctly on Academy page

**Steps**:
1. Navigate to your Academy page
2. Check that courses are displayed
3. Verify featured courses are highlighted
4. Test filtering by category (Web Development, App Development, Digital Marketing)
5. Test search functionality

**Expected Results**:
- ✅ Courses appear with titles, descriptions, and prices
- ✅ Featured courses are visually distinct
- ✅ Filtering works correctly
- ✅ Search returns relevant results

### 2. Course Details
**Objective**: Verify individual course pages work correctly

**Steps**:
1. Click on a course title to view details
2. Check course description, duration, and price
3. Verify prerequisites and learning outcomes display
4. Test navigation between courses

**Expected Results**:
- ✅ Course details page loads correctly
- ✅ All information displays properly
- ✅ Navigation works smoothly

### 3. Enrollment Process
**Objective**: Verify users can enroll in courses

**Steps**:
1. Log in to the Academy (or create account if needed)
2. Navigate to a course page
3. Click "Enroll Now" button
4. Confirm enrollment in dashboard

**Expected Results**:
- ✅ Enrollment succeeds without errors
- ✅ User appears in enrollments table
- ✅ Course appears in user's dashboard

### 4. Progress Tracking
**Objective**: Verify learning progress is tracked

**Steps**:
1. Enroll in a course with modules/lessons
2. Complete a lesson
3. Mark lesson as completed
4. Check progress percentage updates
5. Verify completion date when course finishes

**Expected Results**:
- ✅ Progress updates correctly
- ✅ Completion date records properly
- ✅ Certificate generated upon completion

### 5. Edge Function Testing
**Objective**: Verify backend functions work correctly

**Using Supabase Dashboard**:
1. Go to Database → Functions in Supabase Dashboard
2. Test each function:
   - `get-courses`: Should return course list
   - `enroll`: Should enroll user in course
   - `get-course`: Should return specific course details
   - `get-enrollments`: Should return user's enrollments
   - `update-progress`: Should update lesson progress

**Using curl** (optional):
```bash
# Test get-courses function
curl -X GET "https://uimdbodamoeyukrghchb.functions.supabase.co/get-courses" \
  -H "Authorization: Bearer YOUR_USER_JWT_TOKEN"

# Test enroll function
curl -X POST "https://uimdbodamoeyukrghchb.functions.supabase.co/enroll" \
  -H "Authorization: Bearer YOUR_USER_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"courseId": "COURSE_UUID"}'
```

## 🛠️ Troubleshooting Common Issues

### Issue: Courses Not Displaying
**Solutions**:
1. Check that courses have `is_published = true`
2. Verify `get-courses` function returns data
3. Check browser console for JavaScript errors
4. Confirm Academy Supabase client is initialized

### Issue: Enrollment Fails
**Solutions**:
1. Verify user is logged in
2. Check `enroll` function logs in Supabase Dashboard
3. Confirm course exists and is published
4. Check for duplicate enrollments

### Issue: Progress Not Saving
**Solutions**:
1. Verify user is enrolled in course
2. Check `update-progress` function logs
3. Confirm lesson IDs are correct
4. Check network tab for request errors

## ✅ Success Criteria

Mark each item as complete when tested:

- [ ] Course listing displays correctly
- [ ] Course filtering works
- [ ] Course search functions
- [ ] Individual course pages load
- [ ] Enrollment process works
- [ ] Progress tracking updates
- [ ] Certificates generate upon completion
- [ ] All Edge Functions respond correctly
- [ ] Mobile responsiveness works
- [ ] Performance is acceptable

## 📊 Performance Testing

1. **Load Time**: Page should load in under 3 seconds
2. **Function Response**: Edge Functions should respond in under 1 second
3. **Database Queries**: Queries should execute efficiently
4. **Concurrency**: System should handle multiple simultaneous users

## 🆘 Support Resources

If you encounter issues:

1. **Supabase Dashboard**: Check function logs and database queries
2. **Browser Developer Tools**: Inspect network requests and console errors
3. **Documentation**: Refer to `SETUP_ACADEMY_SUPABASE.md` for setup details
4. **Community**: Supabase Discord and forums for technical help

## 🎉 Completion

Once all tests pass, your Academy is ready for:
- ✅ Content creators to add full course materials
- ✅ Students to enroll and learn
- ✅ Marketing to promote courses
- ✅ Analytics to track performance

Congratulations on successfully deploying your Academy backend!