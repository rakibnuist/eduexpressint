# Hostinger Deployment Guide for EduExpress

This guide will help you deploy your Next.js application to Hostinger hosting.

## Prerequisites

1. **Hostinger Account**: You need a Hostinger hosting account with Node.js support
2. **Domain**: A domain name (can be purchased through Hostinger)
3. **MongoDB Atlas Account**: For production database (free tier available)
4. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)

## Step 1: Prepare Your Application

### 1.1 Environment Configuration

Create a production environment file:

```bash
cp env.example .env.local
```

Update `.env.local` with production values:

```env
# Database Configuration - Use MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edu-express
MONGODB_DB=edu-express

# JWT Secret (Generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

# NextAuth Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret-here-change-this-in-production

# Meta Pixel Configuration
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id_here

# Google Tag Manager Configuration
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Production Environment
NODE_ENV=production

# API Configuration
API_BASE_URL=https://yourdomain.com/api

# Admin Configuration
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-admin-password

# Security Configuration
CORS_ORIGIN=https://yourdomain.com
SECURE_COOKIES=true
```

### 1.2 Build Optimization

Your `next.config.ts` is already optimized for production. The configuration includes:
- Security headers (CSP, HSTS, etc.)
- Image optimization
- Proper CORS settings

## Step 2: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account
   - Create a new cluster (free tier: M0)

2. **Configure Database Access**:
   - Go to "Database Access" in your Atlas dashboard
   - Create a new database user
   - Set username and password
   - Grant "Read and write to any database" permissions

3. **Configure Network Access**:
   - Go to "Network Access" in your Atlas dashboard
   - Add IP address: `0.0.0.0/0` (allow from anywhere)
   - Or add Hostinger's IP ranges for better security

4. **Get Connection String**:
   - Go to "Clusters" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `edu-express`

## Step 3: Deploy to Hostinger

### 3.1 Upload Your Code

**Option A: File Manager (Recommended for beginners)**
1. Log into your Hostinger control panel
2. Go to "File Manager"
3. Navigate to `public_html` folder
4. Upload your project files (zip and extract, or use FTP)

**Option B: Git Deployment (Recommended for developers)**
1. In Hostinger control panel, go to "Git Version Control"
2. Connect your GitHub/GitLab repository
3. Set up automatic deployment

### 3.2 Configure Node.js

1. **Enable Node.js**:
   - In Hostinger control panel, go to "Node.js"
   - Enable Node.js for your domain
   - Set Node.js version to 18.x or 20.x

2. **Set Application Settings**:
   - Application root: `/public_html`
   - Application startup file: `server.js` (we'll create this)
   - Application URL: `https://yourdomain.com`

### 3.3 Create Production Server File

Create a `server.js` file in your project root:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

### 3.4 Install Dependencies

1. **SSH Access** (if available):
   ```bash
   ssh your-username@your-domain.com
   cd public_html
   npm install --production
   ```

2. **Or use Hostinger's Node.js interface**:
   - Go to "Node.js" in control panel
   - Click "Install Dependencies"
   - This will run `npm install`

### 3.5 Build the Application

1. **SSH Access**:
   ```bash
   npm run build
   ```

2. **Or use Hostinger's interface**:
   - In Node.js settings, add build command: `npm run build`

## Step 4: Configure Domain and SSL

### 4.1 Domain Configuration

1. **Point Domain to Hostinger**:
   - If domain is with Hostinger: automatically configured
   - If domain is elsewhere: update nameservers to Hostinger's

2. **Subdomain Setup** (if needed):
   - Create subdomain in Hostinger control panel
   - Point to same directory

### 4.2 SSL Certificate

1. **Enable SSL**:
   - Go to "SSL" in Hostinger control panel
   - Enable "Let's Encrypt" SSL certificate
   - This provides free HTTPS

2. **Force HTTPS**:
   - Enable "Force HTTPS" option
   - This redirects HTTP to HTTPS

## Step 5: Database Setup

### 5.1 Create Admin User

1. **SSH Access**:
   ```bash
   npm run create-admin
   ```

2. **Or manually create**:
   - Access your application at `https://yourdomain.com/admin/login`
   - Use the admin credentials from your `.env.local`

### 5.2 Seed Data (Optional)

If you have seed scripts:
```bash
npm run setup
```

## Step 6: Final Configuration

### 6.1 Update Environment Variables

Make sure all environment variables in `.env.local` are set correctly:
- `NEXTAUTH_URL` should be `https://yourdomain.com`
- `API_BASE_URL` should be `https://yourdomain.com/api`
- `CORS_ORIGIN` should be `https://yourdomain.com`
- `SECURE_COOKIES` should be `true`

### 6.2 Test Your Application

1. **Visit your domain**: `https://yourdomain.com`
2. **Test admin panel**: `https://yourdomain.com/admin`
3. **Test API endpoints**: `https://yourdomain.com/api/universities`
4. **Check database connection**: Look for MongoDB connection logs

## Step 7: Performance Optimization

### 7.1 Enable Caching

1. **Browser Caching**:
   - Enable browser caching in Hostinger control panel
   - Set cache duration for static assets

2. **CDN** (Optional):
   - Enable Cloudflare CDN through Hostinger
   - This improves global loading speeds

### 7.2 Monitor Performance

1. **Google PageSpeed Insights**: Test your site performance
2. **GTmetrix**: Monitor loading times
3. **Google Analytics**: Track user behavior

## Troubleshooting

### Common Issues

1. **Build Errors**:
   - Check Node.js version compatibility
   - Ensure all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection Issues**:
   - Verify MongoDB Atlas connection string
   - Check network access settings
   - Ensure database user has correct permissions

3. **Environment Variables**:
   - Make sure `.env.local` is uploaded
   - Check all required variables are set
   - Verify no typos in variable names

4. **SSL Issues**:
   - Wait for SSL certificate to propagate (up to 24 hours)
   - Clear browser cache
   - Check if HTTPS is properly configured

### Getting Help

1. **Hostinger Support**: Contact through control panel
2. **MongoDB Atlas Support**: Check Atlas documentation
3. **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)

## Security Checklist

- [ ] Strong JWT secret generated
- [ ] Secure admin password set
- [ ] HTTPS enabled and forced
- [ ] Environment variables secured
- [ ] Database access restricted to necessary IPs
- [ ] Regular backups configured
- [ ] Security headers enabled (already in next.config.ts)

## Maintenance

1. **Regular Updates**:
   - Keep dependencies updated
   - Monitor security advisories
   - Update Node.js version when needed

2. **Backups**:
   - Set up automatic database backups in MongoDB Atlas
   - Backup your application files regularly

3. **Monitoring**:
   - Set up uptime monitoring
   - Monitor error logs
   - Track performance metrics

Your EduExpress application should now be successfully deployed on Hostinger!
