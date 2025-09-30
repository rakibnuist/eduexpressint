# Domain and SSL Setup Guide for Hostinger

This guide will help you configure your domain and SSL certificate for your EduExpress application on Hostinger.

## Domain Configuration

### Step 1: Domain Registration

#### Option A: Register New Domain with Hostinger

1. **Purchase Domain**:
   - Log into your Hostinger control panel
   - Go to "Domains" section
   - Click "Register a New Domain"
   - Search for your desired domain name
   - Complete the purchase process

2. **Domain Suggestions for EduExpress**:
   - `eduexpress.com`
   - `eduexpress.info`
   - `eduexpress.org`
   - `studyabroad-express.com`
   - `global-education-express.com`

#### Option B: Transfer Existing Domain

1. **Domain Transfer**:
   - Go to "Domains" in Hostinger control panel
   - Click "Transfer Domain"
   - Enter your domain name
   - Follow the transfer process
   - Note: Transfer can take 5-7 days

#### Option C: Use Existing Domain (Point to Hostinger)

1. **Update Nameservers**:
   - Log into your current domain registrar
   - Find DNS/Nameserver settings
   - Update nameservers to:
     ```
     ns1.dns-parking.com
     ns2.dns-parking.com
     ```
   - Wait for propagation (up to 48 hours)

### Step 2: Domain Configuration in Hostinger

1. **Add Domain to Hosting**:
   - Go to "Hosting" in control panel
   - Click "Add Website"
   - Enter your domain name
   - Select your hosting plan
   - Click "Add"

2. **DNS Configuration**:
   - Go to "DNS Zone Editor"
   - Verify these records exist:
     ```
     A Record: @ → Your server IP
     A Record: www → Your server IP
     CNAME: www → yourdomain.com
     ```

## SSL Certificate Setup

### Step 1: Enable SSL Certificate

1. **Access SSL Settings**:
   - Go to "SSL" in your Hostinger control panel
   - Find your domain in the list
   - Click "Manage" next to your domain

2. **Enable Let's Encrypt SSL**:
   - Toggle "SSL Certificate" to ON
   - Select "Let's Encrypt" (Free)
   - Click "Save Changes"

3. **Wait for Certificate**:
   - SSL certificate generation takes 5-10 minutes
   - You'll receive an email when ready

### Step 2: Force HTTPS

1. **Enable Force HTTPS**:
   - In SSL settings, toggle "Force HTTPS" to ON
   - This redirects all HTTP traffic to HTTPS
   - Click "Save Changes"

2. **Verify Redirect**:
   - Visit `http://yourdomain.com`
   - Should automatically redirect to `https://yourdomain.com`

### Step 3: SSL Certificate Verification

1. **Check Certificate Status**:
   - Visit your website
   - Look for the lock icon in the address bar
   - Click the lock icon to view certificate details

2. **Test SSL Configuration**:
   - Use [SSL Labs SSL Test](https://www.ssllabs.com/ssltest/)
   - Enter your domain name
   - Check for any security issues

## Advanced SSL Configuration

### Custom SSL Certificate (Optional)

If you have a custom SSL certificate:

1. **Upload Certificate**:
   - Go to SSL settings
   - Select "Custom SSL"
   - Upload your certificate files:
     - Certificate (.crt)
     - Private Key (.key)
     - Certificate Authority Bundle (.ca-bundle)

2. **Configure Certificate**:
   - Paste certificate content
   - Paste private key content
   - Paste CA bundle content
   - Click "Save Changes"

### SSL Security Headers

Your Next.js application already includes security headers in `next.config.ts`:

```typescript
// Security headers are already configured
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https: data: blob:",
  "connect-src 'self' https: ws: wss:",
  "font-src 'self' data:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');
```

## Subdomain Configuration

### Create Subdomains (Optional)

1. **Admin Subdomain**:
   - Create `admin.yourdomain.com`
   - Point to same directory
   - Useful for admin panel access

2. **API Subdomain**:
   - Create `api.yourdomain.com`
   - Point to same directory
   - Useful for API endpoints

3. **Subdomain Setup**:
   - Go to "Subdomains" in control panel
   - Click "Create Subdomain"
   - Enter subdomain name
   - Select document root
   - Click "Create"

## DNS Configuration

### Essential DNS Records

1. **A Records**:
   ```
   @ → Your server IP address
   www → Your server IP address
   ```

2. **CNAME Records**:
   ```
   www → yourdomain.com
   ```

3. **MX Records** (for email):
   ```
   @ → mail.yourdomain.com (if using Hostinger email)
   ```

### Advanced DNS Records

1. **TXT Records** (for verification):
   ```
   @ → "v=spf1 include:_spf.hostinger.com ~all"
   ```

2. **CAA Records** (for SSL):
   ```
   @ → "0 issue \"letsencrypt.org\""
   ```

## Email Configuration

### Set Up Email Accounts

1. **Create Email Accounts**:
   - Go to "Email Accounts" in control panel
   - Click "Create Email Account"
   - Create accounts like:
     - `admin@yourdomain.com`
     - `info@yourdomain.com`
     - `support@yourdomain.com`

2. **Email Client Configuration**:
   - IMAP: `imap.hostinger.com` (Port 993, SSL)
   - SMTP: `smtp.hostinger.com` (Port 587, TLS)
   - POP3: `pop3.hostinger.com` (Port 995, SSL)

## Performance Optimization

### CDN Configuration

1. **Enable Cloudflare** (Free):
   - Go to "Cloudflare" in control panel
   - Enable Cloudflare for your domain
   - This provides CDN and DDoS protection

2. **CDN Benefits**:
   - Faster loading times globally
   - Reduced server load
   - Better security
   - Free SSL certificate

### Caching Configuration

1. **Browser Caching**:
   - Enable in Hostinger control panel
   - Set cache duration for static assets
   - Improves repeat visitor experience

2. **Application Caching**:
   - Your Next.js app includes caching
   - Static assets are automatically cached
   - API responses can be cached

## Monitoring and Maintenance

### Uptime Monitoring

1. **Set Up Monitoring**:
   - Use services like UptimeRobot (free)
   - Monitor your main domain
   - Set up email alerts for downtime

2. **Performance Monitoring**:
   - Use Google PageSpeed Insights
   - Monitor Core Web Vitals
   - Check GTmetrix for performance

### SSL Certificate Renewal

1. **Automatic Renewal**:
   - Let's Encrypt certificates auto-renew
   - No manual intervention needed
   - Renewal happens 30 days before expiry

2. **Manual Renewal** (if needed):
   - Go to SSL settings
   - Click "Renew Certificate"
   - Wait for renewal process

## Troubleshooting

### Common Issues

1. **SSL Not Working**:
   - Wait for certificate propagation (up to 24 hours)
   - Clear browser cache
   - Check DNS propagation
   - Verify domain is pointing to Hostinger

2. **Domain Not Resolving**:
   - Check DNS settings
   - Wait for DNS propagation
   - Verify nameservers are correct
   - Check domain registration status

3. **HTTPS Redirect Issues**:
   - Verify "Force HTTPS" is enabled
   - Check .htaccess file
   - Clear browser cache
   - Test in incognito mode

4. **Email Not Working**:
   - Verify email account creation
   - Check email client settings
   - Test with webmail interface
   - Check spam folder

### Getting Help

1. **Hostinger Support**:
   - Live chat available 24/7
   - Ticket system for complex issues
   - Knowledge base for common problems

2. **External Resources**:
   - [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL testing
   - [DNS Checker](https://dnschecker.org/) - DNS propagation
   - [GTmetrix](https://gtmetrix.com/) - Performance testing

## Security Checklist

- [ ] SSL certificate installed and working
- [ ] HTTPS redirect enabled
- [ ] Security headers configured
- [ ] DNS records properly set
- [ ] Email accounts configured
- [ ] CDN enabled (optional)
- [ ] Monitoring set up
- [ ] Backup strategy in place

## Final Verification

1. **Test Your Website**:
   - Visit `https://yourdomain.com`
   - Check for SSL lock icon
   - Test all main pages
   - Verify admin panel access

2. **Test Email**:
   - Send test email from admin account
   - Check email delivery
   - Test email client configuration

3. **Performance Test**:
   - Run PageSpeed Insights
   - Check GTmetrix score
   - Test mobile responsiveness

Your domain and SSL are now properly configured for your EduExpress application!
