# Database Setup Guide for EduExpress

This guide will help you set up MongoDB Atlas for your production deployment.

## MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. **Sign Up**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Click "Try Free" or "Start Free"
   - Create an account with your email

2. **Choose Plan**:
   - Select "M0 Sandbox" (Free tier)
   - This provides 512 MB storage and shared RAM
   - Perfect for development and small production apps

### Step 2: Create a Cluster

1. **Select Cloud Provider**:
   - Choose AWS, Google Cloud, or Azure
   - Select a region closest to your users
   - For Hostinger, choose a European region

2. **Cluster Configuration**:
   - Cluster Name: `edu-express-cluster`
   - Cluster Tier: M0 Sandbox (Free)
   - Click "Create Cluster"

3. **Wait for Creation**:
   - Cluster creation takes 3-5 minutes
   - You'll see a progress indicator

### Step 3: Configure Database Access

1. **Create Database User**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Authentication Method: "Password"
   - Username: `edu-express-user`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Important**: Save the username and password - you'll need them for your environment variables.

### Step 4: Configure Network Access

1. **Add IP Addresses**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IP addresses for better security
   - Click "Confirm"

2. **Security Note**: 
   - Allowing access from anywhere (0.0.0.0/0) is convenient but less secure
   - For production, consider adding only Hostinger's IP ranges

### Step 5: Get Connection String

1. **Connect to Cluster**:
   - Go to "Clusters" in the left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"

2. **Connection Details**:
   - Driver: Node.js
   - Version: 4.1 or later
   - Copy the connection string

3. **Connection String Format**:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

4. **Update Connection String**:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name: `?retryWrites=true&w=majority&appName=Cluster0` → `?retryWrites=true&w=majority&appName=Cluster0&dbName=edu-express`

### Step 6: Test Connection

1. **Update Environment Variables**:
   ```env
   MONGODB_URI=mongodb+srv://edu-express-user:your-password@cluster0.xxxxx.mongodb.net/edu-express?retryWrites=true&w=majority&appName=Cluster0
   MONGODB_DB=edu-express
   ```

2. **Test Locally**:
   ```bash
   npm run dev
   ```
   - Check console for "MongoDB connected successfully" message
   - If you see connection errors, verify your connection string

## Database Collections

Your application will automatically create these collections:

### 1. Users Collection
- **Purpose**: Store admin users and authentication data
- **Schema**: User model with email, password hash, role, etc.

### 2. Universities Collection
- **Purpose**: Store university information and details
- **Schema**: University model with name, location, programs, etc.

### 3. Leads Collection
- **Purpose**: Store form submissions and lead data
- **Schema**: Lead model with contact information, interests, etc.

### 4. B2B Leads Collection
- **Purpose**: Store B2B partnership inquiries
- **Schema**: B2BLead model with company information, etc.

### 5. Success Stories Collection
- **Purpose**: Store student success stories and testimonials
- **Schema**: StudentSuccessStory model with student details, achievements, etc.

### 6. Updates Collection
- **Purpose**: Store news and updates
- **Schema**: Update model with title, content, date, etc.

### 7. Destinations Collection
- **Purpose**: Store destination information
- **Schema**: Destination model with country details, programs, etc.

## Initial Data Setup

### Create Admin User

1. **Using Script** (Recommended):
   ```bash
   npm run create-admin
   ```

2. **Manual Creation**:
   - Access your application
   - Go to `/admin/login`
   - Use the admin credentials from your `.env.local`

### Seed Initial Data (Optional)

If you have seed scripts:
```bash
npm run setup
```

## Database Monitoring

### MongoDB Atlas Dashboard

1. **Metrics**:
   - Monitor connection count
   - Check storage usage
   - View query performance

2. **Alerts**:
   - Set up alerts for high connection count
   - Monitor storage usage
   - Set up performance alerts

### Application Logs

Monitor your application logs for:
- Database connection status
- Query performance
- Error messages

## Security Best Practices

### 1. Database User Security
- Use strong passwords
- Regularly rotate passwords
- Use least privilege principle

### 2. Network Security
- Restrict IP access when possible
- Use VPC peering for production
- Enable audit logging

### 3. Data Security
- Enable encryption at rest
- Use SSL/TLS for connections
- Regular backups

### 4. Application Security
- Validate all inputs
- Use parameterized queries
- Implement rate limiting

## Backup Strategy

### MongoDB Atlas Backups

1. **Automatic Backups**:
   - M0 clusters: Daily snapshots (7-day retention)
   - M10+ clusters: Continuous backups

2. **Manual Backups**:
   - Create snapshots before major changes
   - Export data for migration

### Application Backups

1. **Code Backups**:
   - Use Git for version control
   - Regular commits and pushes

2. **Configuration Backups**:
   - Backup environment files
   - Document configuration changes

## Troubleshooting

### Common Issues

1. **Connection Timeout**:
   - Check network access settings
   - Verify connection string
   - Check firewall settings

2. **Authentication Failed**:
   - Verify username and password
   - Check database user permissions
   - Ensure user exists in Atlas

3. **Database Not Found**:
   - Collections are created automatically
   - Check database name in connection string
   - Verify MONGODB_DB environment variable

4. **Performance Issues**:
   - Monitor query performance in Atlas
   - Check for missing indexes
   - Optimize queries

### Getting Help

1. **MongoDB Atlas Documentation**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
2. **MongoDB Community**: [community.mongodb.com](https://community.mongodb.com)
3. **Atlas Support**: Available through Atlas dashboard

## Cost Optimization

### Free Tier Limits
- 512 MB storage
- Shared RAM
- 100 connections
- No dedicated cluster

### Upgrade Considerations
- Monitor usage regularly
- Upgrade when approaching limits
- Consider M2/M5 for production

### Cost Monitoring
- Set up billing alerts
- Monitor usage patterns
- Optimize queries to reduce costs

Your MongoDB Atlas database is now ready for production use with your EduExpress application!
