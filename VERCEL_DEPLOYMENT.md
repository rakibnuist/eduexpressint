# Vercel Deployment Guide

## 🚀 Database Connection with Vercel

### Step 1: Set up MongoDB Atlas

1. **Create MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (free tier available)

2. **Configure Database Access:**
   - Go to "Database Access" → "Add New Database User"
   - Create username and password
   - Grant "Read and write to any database" permissions

3. **Configure Network Access:**
   - Go to "Network Access" → "Add IP Address"
   - Add `0.0.0.0/0` for global access (or Vercel IP ranges)

4. **Get Connection String:**
   - Go to "Clusters" → "Connect" → "Connect your application"
   - Copy the connection string

### Step 2: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project → Settings → Environment Variables
   - Add the following variables:

### Step 3: Environment Variables

Add these to Vercel Dashboard → Settings → Environment Variables:

```bash
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edu-express
MONGODB_DB=edu-express

# JWT Secret (Generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# NextAuth Configuration
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-here

# Meta Pixel Configuration
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id_here

# Google Tag Manager Configuration
NEXT_PUBLIC_GTM_ID=GTM-PCJ78FZ5

# Production Environment
NODE_ENV=production

# API Configuration
API_BASE_URL=https://your-domain.vercel.app/api

# Admin Configuration
ADMIN_EMAIL=admin@eduexpress.info
ADMIN_PASSWORD=your-secure-admin-password

# Security Configuration
CORS_ORIGIN=https://your-domain.vercel.app
SECURE_COOKIES=true
```

### Step 4: Test Database Connection

After deployment, test your database connection:

1. Visit: `https://your-domain.vercel.app/api/test-db`
2. You should see: `{"status":"success","message":"Database connected successfully"}`

### Step 5: Create Admin User

Run the admin creation script:

```bash
# Set environment variables locally
export MONGODB_URI="your-mongodb-connection-string"
export JWT_SECRET="your-jwt-secret"

# Create admin user
npm run create-admin
```

### Troubleshooting

**Common Issues:**

1. **Connection Timeout:**
   - Check MongoDB Atlas network access settings
   - Ensure IP address `0.0.0.0/0` is whitelisted

2. **Authentication Failed:**
   - Verify username/password in connection string
   - Check database user permissions

3. **Environment Variables:**
   - Ensure all required variables are set in Vercel
   - Redeploy after adding new variables

4. **CORS Issues:**
   - Update `CORS_ORIGIN` to your Vercel domain
   - Check `NEXTAUTH_URL` matches your domain

### Security Best Practices

1. **Use Strong Secrets:**
   - Generate strong JWT_SECRET and NEXTAUTH_SECRET
   - Use environment variables for all sensitive data

2. **Database Security:**
   - Use MongoDB Atlas built-in security features
   - Enable database encryption
   - Regular security updates

3. **Network Security:**
   - Consider restricting IP access to Vercel ranges
   - Use MongoDB Atlas VPC peering for production

### Monitoring

1. **Vercel Analytics:**
   - Enable Vercel Analytics for performance monitoring
   - Monitor function execution times

2. **MongoDB Atlas Monitoring:**
   - Use Atlas monitoring for database performance
   - Set up alerts for connection issues

3. **Error Tracking:**
   - Consider adding error tracking (Sentry, etc.)
   - Monitor API endpoint health
