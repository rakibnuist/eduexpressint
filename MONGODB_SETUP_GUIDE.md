# MongoDB Atlas Setup Guide

## 🚨 Database Connection Issue

Your EduExpress website is currently running in **offline mode** because the MongoDB Atlas connection is failing.

## 🔍 Current Issue

The error indicates that the MongoDB Atlas cluster cannot be found. This usually means:

1. **Cluster doesn't exist** - The cluster name in the connection string is incorrect
2. **Network access not configured** - IP addresses not whitelisted
3. **Database user doesn't exist** - Authentication credentials are wrong
4. **Cluster is paused** - MongoDB Atlas cluster is not running

## 🛠️ How to Fix

### Step 1: Check MongoDB Atlas Dashboard

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in to your account
3. Select your project
4. Check if you have a cluster running

### Step 2: Get the Correct Connection String

1. In MongoDB Atlas, click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select **"Node.js"** and version **"4.1 or later"**
4. Copy the connection string

The connection string should look like:
```
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
```

### Step 3: Update Environment Variables

Once you have the correct connection string, update it in Vercel:

```bash
# Remove the old MongoDB URI
vercel env rm MONGODB_URI

# Add the correct MongoDB URI for all environments
echo "mongodb+srv://your-username:your-password@your-cluster.mongodb.net/edu-express" | vercel env add MONGODB_URI production
echo "mongodb+srv://your-username:your-password@your-cluster.mongodb.net/edu-express" | vercel env add MONGODB_URI preview
echo "mongodb+srv://your-username:your-password@your-cluster.mongodb.net/edu-express" | vercel env add MONGODB_URI development
```

### Step 4: Configure Network Access

1. In MongoDB Atlas, go to **"Network Access"**
2. Click **"Add IP Address"**
3. Add **"0.0.0.0/0"** for global access (or your specific IP)
4. Click **"Confirm"**

### Step 5: Configure Database Access

1. In MongoDB Atlas, go to **"Database Access"**
2. Make sure you have a database user with:
   - Username: `eduexpress` (or your preferred username)
   - Password: `EduExpress@123` (or your preferred password)
   - Database User Privileges: **"Read and write to any database"**

### Step 6: Redeploy

```bash
vercel --prod
```

## 🧪 Test the Connection

After updating the connection string, test it:

```bash
curl -s https://www.eduexpressint.com/api/test-db
```

You should see:
```json
{
  "status": "success",
  "message": "Database connected successfully",
  "timestamp": "2025-10-01T10:46:26.431Z"
}
```

## 🔧 Alternative: Create New MongoDB Atlas Cluster

If you don't have a MongoDB Atlas cluster:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Create"** or **"Build a Database"**
3. Choose **"M0 Sandbox"** (free tier)
4. Select a cloud provider and region
5. Create a cluster name (e.g., `cluster0`)
6. Create a database user
7. Configure network access
8. Get the connection string

## 📞 Need Help?

If you're still having issues:

1. **Check MongoDB Atlas Status**: Visit [status.mongodb.com](https://status.mongodb.com/)
2. **Verify Cluster Status**: Make sure your cluster is running (not paused)
3. **Check Billing**: Ensure your MongoDB Atlas account is in good standing
4. **Contact Support**: Use MongoDB Atlas support if needed

## 🎯 Expected Result

Once fixed, your website will:
- ✅ Connect to MongoDB Atlas successfully
- ✅ Load university data dynamically
- ✅ Process form submissions
- ✅ Store user leads and data
- ✅ Run in full online mode

---

**Current Status**: 🔴 Database Offline - Website running in offline mode
**Target Status**: 🟢 Database Online - Full functionality restored
