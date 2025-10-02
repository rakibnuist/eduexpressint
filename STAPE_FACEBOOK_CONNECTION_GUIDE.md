# Complete Guide: Connect Website → Stape → Facebook

## 🎯 Overview
You now have Stape and GTM connected. This guide will complete the connection to Facebook for enhanced server-side tracking.

## ✅ What You Have Already:
- ✅ Stape.io account with free container
- ✅ Google Tag Manager server-side container (GTM-MCG5MT3K)
- ✅ Both systems connected and running

## 🔗 What We Need to Complete:
1. Configure Meta Conversions API in GTM
2. Connect your website to send data to Stape
3. Test the complete flow: Website → Stape → GTM → Facebook

---

## Step 1: Configure Meta Conversions API in GTM

### A. Add Meta Conversions API Template

1. **Go to your GTM Server-side container:**
   - Open Google Tag Manager
   - Select your server container: `GTM-MCG5MT3K`

2. **Add Meta template:**
   - Go to Templates → Search Gallery
   - Search for "Meta Conversions API"
   - Click on the official Meta template
   - Click "Add to workspace"

### B. Get Meta Access Token

1. **Go to Meta Business Manager:**
   - Navigate to Events Manager
   - Select your pixel (ID: 1444050970227269)
   - Go to Settings → Conversions API
   - Click "Generate Access Token"
   - Copy the token (starts with `EAA...`)

### C. Create Meta Conversions API Tag

1. **In GTM Server container:**
   - Go to Tags → New
   - Choose "Meta Conversions API" template
   - Configure:
     - **Pixel ID:** `1444050970227269`
     - **Access Token:** [paste your token]
     - **Test Event Code:** `TEST65812`

2. **Set up triggers:**
   - Create trigger for "All Server-side Events"
   - Or create specific triggers for Lead, PageView, etc.

3. **Save and publish** the container

---

## Step 2: Connect Your Website to Stape

### A. Add Environment Variables

Add to your `.env.local` file:

```bash
# Stape Configuration
NEXT_PUBLIC_STAPE_URL=https://your-container.stape.io
NEXT_PUBLIC_SERVER_GTM_ID=GTM-MCG5MT3K
NEXT_PUBLIC_ENABLE_SERVER_SIDE_TRACKING=true

# Meta Access Token (for server-side API)
META_ACCESS_TOKEN=your_meta_access_token_here
META_TEST_EVENT_CODE=TEST65812
```

**To get your Stape URL:**
1. Go to your Stape dashboard
2. Copy the container URL from the settings
3. It looks like: `https://sgtm.your-domain.com` or `https://container-id.stape.io`

### B. Update Your Website Code

I've already created the Stape tracking components. Now let's integrate them:

1. **Add Stape components to your layout:**

```typescript
// In src/app/layout.tsx
import StapeTrackingProvider from '@/components/StapeTracking';
import StapeTester from '@/components/StapeTester';

// Wrap your app:
<StapeTrackingProvider>
  {/* Your existing components */}
  <StapeTester />
</StapeTrackingProvider>
```

2. **The components will automatically:**
   - Initialize Stape tracking
   - Send events to Stape → GTM → Meta
   - Provide testing tools

---

## Step 3: Test the Complete Flow

### A. Test Your Setup

1. **Visit your website with test parameter:**
   ```
   https://www.eduexpressint.com?test-stape
   ```

2. **You'll see the orange "🚀 Show Stape Tester" button**

3. **Run tests in this order:**
   - Click "🔧 Check Config" - Verify Stape URL is configured
   - Click "📡 Test Connection" - Test basic connectivity
   - Click "🚀 Run Stape Test Suite" - Test all events

### B. Verify in GTM Preview

1. **Enable GTM Preview mode:**
   - In GTM, click "Preview"
   - Enter your website URL
   - You should see server-side events coming through

2. **Check for events:**
   - Look for events with names like `stape_lead`, `stape_page_view`
   - Verify they trigger your Meta Conversions API tag

### C. Verify in Meta Events Manager

1. **Go to Meta Events Manager:**
   - Select your pixel
   - Go to "Test Events" tab
   - You should see server-side events with `TEST65812` code

2. **Check event quality:**
   - Server-side events should show higher quality scores
   - More user data should be captured
   - Better attribution data

---

## Step 4: Expected Results

### Before Server-Side Tracking:
- ~60-70% conversion tracking accuracy
- Limited by ad blockers and iOS restrictions
- Basic attribution data

### After Stape + GTM + Meta Setup:
- ~85-95% conversion tracking accuracy
- Bypasses most ad blockers
- Enhanced attribution and user data
- Better audience building capabilities

### Cost:
- **Stape:** FREE (10,000 requests/month)
- **GTM:** FREE (unlimited)
- **Meta Conversions API:** FREE (no per-event charges when using properly)

---

## Step 5: Troubleshooting

### Common Issues:

1. **"Stape not configured" error:**
   - Add `NEXT_PUBLIC_STAPE_URL` to your `.env.local`
   - Restart your development server
   - Redeploy to production

2. **Events not showing in Meta:**
   - Check Meta Access Token is correct
   - Verify GTM tag configuration
   - Ensure triggers are set up properly

3. **GTM Preview not showing events:**
   - Check Stape URL is accessible
   - Verify server-side GTM container ID
   - Check browser console for errors

### Debug Steps:

1. **Check browser console:**
   ```javascript
   // Check if Stape is initialized
   console.log(window.dataLayer);
   
   // Check recent events
   console.log(window.dataLayer.slice(-5));
   ```

2. **Test Stape URL directly:**
   - Visit your Stape URL in browser
   - Should show GTM server response

3. **Verify Meta token:**
   - Test the token in Meta's API explorer
   - Ensure it has proper permissions

---

## Step 6: Production Deployment

### A. Add Environment Variables to Vercel

1. **Go to Vercel Dashboard:**
   - Select your project
   - Go to Settings → Environment Variables

2. **Add these variables:**
   ```
   NEXT_PUBLIC_STAPE_URL=https://your-container.stape.io
   NEXT_PUBLIC_SERVER_GTM_ID=GTM-MCG5MT3K
   META_ACCESS_TOKEN=your_meta_access_token
   ```

### B. Deploy and Test

1. **Deploy your changes:**
   ```bash
   git add .
   git commit -m "Add Stape integration for server-side tracking"
   git push
   ```

2. **Test on production:**
   - Visit `https://www.eduexpressint.com?test-stape`
   - Run the Stape test suite
   - Verify events in Meta Events Manager

---

## 🎉 Success Metrics

Once everything is working, you should see:

### In Stape Dashboard:
- ✅ Requests being processed
- ✅ GTM container receiving data
- ✅ No errors in logs

### In GTM Preview:
- ✅ Server-side events firing
- ✅ Meta Conversions API tags triggering
- ✅ Event data being processed

### In Meta Events Manager:
- ✅ Server-side events with test code
- ✅ Higher event quality scores
- ✅ More complete user data
- ✅ Better attribution information

### Expected Improvements:
- **20-40% increase** in tracked conversions
- **Better campaign attribution**
- **Enhanced audience building**
- **Improved ROAS measurement**

---

## 📞 Need Help?

If you encounter issues:

1. **Check the Stape tester results** - It will show specific error messages
2. **Verify all environment variables** are set correctly
3. **Test each step individually** - Don't skip the configuration checks
4. **Check browser console** for JavaScript errors
5. **Use GTM Preview mode** to debug server-side events

The setup should take about 15-20 minutes once you have all the tokens and URLs configured properly.
