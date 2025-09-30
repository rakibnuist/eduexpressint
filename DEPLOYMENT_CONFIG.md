# EduExpress Deployment Configuration

## Your Production Environment Variables

Create a `.env.local` file in your project root with these exact values:

```env
# Production Environment Configuration for EduExpress
# Domain: eduexpressint.com

# Database Configuration - MongoDB Atlas
MONGODB_URI=mongodb+srv://eduexpress:EduExpress@123@cluster.mongodb.net/edu-express
MONGODB_DB=edu-express

# JWT Secret
JWT_SECRET=50bbd596a150d5e47d1fd6437926dd01

# NextAuth Configuration
NEXTAUTH_URL=https://eduexpressint.com
NEXTAUTH_SECRET=50bbd596a150d5e47d1fd6437926dd01

# Meta Pixel Configuration
NEXT_PUBLIC_META_PIXEL_ID=2215890842219816

# Google Tag Manager Configuration
NEXT_PUBLIC_GTM_ID=PCJ78FZ5

# Google Analytics (Optional - can be managed through GTM)
NEXT_PUBLIC_GA_ID=

# Email Configuration (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# File Upload Configuration (Optional)
UPLOAD_MAX_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf

# Rate Limiting (Optional)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

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

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=logs/app.log

# Cache Configuration (Optional)
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600

# External API Keys (Optional)
GOOGLE_MAPS_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

## Important Notes

### 1. MongoDB Connection String
✅ **COMPLETE**: Your MongoDB Atlas connection string is ready:
`mongodb+srv://eduexpress:EduExpress@123@cluster.mongodb.net/edu-express`

- **Username**: `eduexpress`
- **Password**: `EduExpress@123`
- **Database**: `edu-express`

### 2. Domain Configuration
- **Domain**: `eduexpressint.com`
- **Full URL**: `https://eduexpressint.com`
- **Admin URL**: `https://eduexpressint.com/admin`

### 3. Tracking Configuration
- **Google Tag Manager ID**: `PCJ78FZ5`
- **Meta Pixel ID**: `2215890842219816`

### 4. Admin Access
- **Admin Email**: `admin@eduexpressint.com`
- **Admin Password**: `admin123` (change this for security!)

## Next Steps for Deployment

1. ✅ **MongoDB URI**: Complete with your credentials
2. **Create .env.local**: Copy the configuration above to `.env.local`
3. **Deploy to Hostinger**: Follow the HOSTINGER_DEPLOYMENT.md guide
4. **Configure Domain**: Follow the DOMAIN_SSL_SETUP.md guide

## Security Recommendations

1. **Change Admin Password**: Use a strong password instead of `admin123`
2. **Generate New JWT Secret**: Consider generating a new JWT secret for production
3. **Secure MongoDB**: Ensure your MongoDB Atlas user has proper permissions
4. **Enable HTTPS**: Make sure SSL is properly configured

## Testing Your Configuration

After deployment, test these URLs:
- Main site: `https://eduexpressint.com`
- Admin panel: `https://eduexpressint.com/admin`
- API endpoint: `https://eduexpressint.com/api/universities`

Your EduExpress application is ready for deployment with these configurations!
