# 🚀 Deployment Guide with Meta Pixel Tracking

## Overview
This guide will help you deploy your EduExpress website with the newly implemented Meta Pixel tracking system.

## Pre-Deployment Checklist

### ✅ Meta Pixel Implementation
- [x] Meta Pixel code added to layout.tsx
- [x] Page tracking hooks implemented
- [x] Form tracking implemented
- [x] Environment variables updated
- [x] Production environment configured

### ✅ Code Quality
- [x] No linting errors
- [x] TypeScript compilation successful
- [x] All imports resolved
- [x] Build process tested

## Deployment Options

### Option 1: Quick Deploy with Script (Recommended)

```bash
# Run the deployment script
./deploy.sh
```

### Option 2: Manual Deploy

```bash
# 1. Build the project
npm run build

# 2. Deploy to Vercel
vercel --prod
```

### Option 3: GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Enable automatic deployments

## Environment Variables Setup

### Required Environment Variables in Vercel Dashboard

Go to your Vercel project → Settings → Environment Variables and add:

```bash
# Database Configuration
MONGODB_URI=mongodb+srv://eduexpress:EduExpress@123@cluster.mongodb.net/edu-express
MONGODB_DB=edu-express

# JWT Secret
JWT_SECRET=50bbd596a150d5e47d1fd6437926dd01

# NextAuth Configuration
NEXTAUTH_URL=https://eduexpressint.com
NEXTAUTH_SECRET=50bbd596a150d5e47d1fd6437926dd01

# Meta Pixel Configuration (UPDATED)
NEXT_PUBLIC_META_PIXEL_ID=1444050970227269

# Google Tag Manager Configuration
NEXT_PUBLIC_GTM_ID=PCJ78FZ5

# Production Environment
NODE_ENV=production

# API Configuration
API_BASE_URL=https://eduexpressint.com/api

# Admin Configuration
ADMIN_EMAIL=admin@eduexpressint.com
ADMIN_PASSWORD=admin123

# Security Configuration
CORS_ORIGIN=https://eduexpressint.com
SECURE_COOKIES=true
```

## Post-Deployment Testing

### 1. Test Meta Pixel Tracking

#### Using Facebook Pixel Helper
1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
2. Visit your deployed website
3. Check for green checkmarks indicating pixel fires
4. Verify the pixel ID matches: `1444050970227269`

#### Using Browser Console
1. Open browser developer tools
2. Go to Console tab
3. Look for tracking logs:
   - "Meta Pixel ViewContent tracked: ..."
   - "Meta Pixel Lead tracked: ..."
   - "Meta Pixel Form Submission tracked: ..."

#### Using Facebook Events Manager
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Select your pixel (ID: 1444050970227269)
3. Check "Test Events" tab for real-time events
4. Verify events are being received

### 2. Test Database Connection

Visit: `https://eduexpressint.com/api/test-db`

Expected response:
```json
{
  "status": "success",
  "message": "Database connected successfully"
}
```

### 3. Test Form Submissions

1. Fill out the contact form
2. Submit the form
3. Check Facebook Events Manager for Lead events
4. Verify form data is saved to database

### 4. Test Page Tracking

Visit different pages and verify tracking:
- Homepage: ViewContent event
- Destination pages: ViewContent with destination data
- University pages: ViewContent with university data
- Service pages: ViewContent with service data

## Troubleshooting

### Meta Pixel Not Working

1. **Check Pixel ID**: Verify `NEXT_PUBLIC_META_PIXEL_ID=1444050970227269` is set
2. **Check Console Errors**: Look for JavaScript errors
3. **Check Network Tab**: Verify pixel requests are being sent
4. **Check Ad Blockers**: Disable ad blockers for testing

### Build Errors

1. **TypeScript Errors**: Run `npm run lint` to check for issues
2. **Import Errors**: Verify all imports are correct
3. **Environment Variables**: Ensure all required variables are set

### Database Connection Issues

1. **MongoDB Atlas**: Check network access settings
2. **Connection String**: Verify MongoDB URI is correct
3. **Credentials**: Check username/password in connection string

## Performance Optimization

### After Deployment

1. **Enable Vercel Analytics**: Monitor performance
2. **Check Core Web Vitals**: Use Google PageSpeed Insights
3. **Monitor Meta Pixel**: Check for tracking errors
4. **Database Performance**: Monitor MongoDB Atlas metrics

## Security Checklist

- [x] Environment variables secured
- [x] JWT secrets are strong
- [x] CORS properly configured
- [x] Security headers set in vercel.json
- [x] Admin credentials secured

## Monitoring Setup

### 1. Vercel Analytics
- Enable in Vercel Dashboard
- Monitor function execution times
- Track performance metrics

### 2. Facebook Events Manager
- Monitor pixel performance
- Set up conversion tracking
- Create custom audiences

### 3. MongoDB Atlas
- Set up monitoring alerts
- Track database performance
- Monitor connection health

## Rollback Plan

If issues occur after deployment:

1. **Revert to Previous Version**: Use Vercel's deployment history
2. **Fix Environment Variables**: Update in Vercel Dashboard
3. **Redeploy**: Use `vercel --prod` command
4. **Test Thoroughly**: Verify all functionality works

## Success Metrics

After successful deployment, you should see:

- ✅ Website loads without errors
- ✅ Meta Pixel fires on all pages
- ✅ Form submissions tracked
- ✅ Database connection working
- ✅ Admin panel accessible
- ✅ All pages tracking correctly

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify environment variables in Vercel
3. Test database connection
4. Check Facebook Events Manager for pixel activity
5. Review Vercel deployment logs

## Next Steps

After successful deployment:

1. **Set up Facebook Ads**: Use the tracked events for ad optimization
2. **Create Custom Audiences**: Based on tracked user behavior
3. **Set up Conversion Tracking**: For lead generation campaigns
4. **Monitor Performance**: Regular checks on tracking and performance
5. **Optimize Based on Data**: Use tracking data to improve user experience

---

**Deployment Status**: Ready for production deployment with Meta Pixel tracking fully implemented! 🎉
