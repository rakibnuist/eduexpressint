# Admin Login Credentials

## Default Admin Account

**Email:** `admin@eduexpress.info`  
**Password:** `admin123`

## User Details

- **Role:** Superuser (full access to all features)
- **Permissions:** All permissions enabled
- **Status:** Active

## Available Features

With the superuser role, you have access to:

- ✅ Leads Management
- ✅ Universities Management  
- ✅ B2B Partnership Management
- ✅ Updates Management
- ✅ Admin Management
- ✅ Success Stories Management

## Security Note

⚠️ **Important:** These are default credentials for development/testing purposes. 

**For production deployment, you should:**

1. Change the default password
2. Implement proper user management
3. Use secure authentication (JWT tokens, bcrypt hashing)
4. Set up proper session management
5. Add two-factor authentication if needed

## How to Change Credentials

To change the admin credentials, edit the `ADMIN_CREDENTIALS` object in:
```
src/app/api/auth/login/route.ts
```

## Access URLs

- **Admin Login:** http://localhost:3000/admin/login
- **Admin Dashboard:** http://localhost:3000/admin
- **Leads Management:** http://localhost:3000/admin/leads
- **Universities Management:** http://localhost:3000/admin/universities
- **Updates Management:** http://localhost:3000/admin/updates
