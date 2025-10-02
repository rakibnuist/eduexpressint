# Stape Server-Side Tracking Setup Instructions

## Quick Start Guide

### Step 1: Create Stape Account (5 minutes)
1. Go to: https://app.eu.stape.io/container/new
2. Sign up with your email (no credit card required)
3. Create a new container
4. Choose your region (Europe recommended for GDPR compliance)
5. Note your container URL (e.g., `https://your-container.stape.io`)

### Step 2: Configure Server-Side GTM (10 minutes)
1. **Create Server-Side GTM Container:**
   - Go to Google Tag Manager
   - Create new container
   - Choose "Server" as container type
   - Copy the container ID (GTM-XXXXXXX)

2. **Link Stape to GTM:**
   - In Stape dashboard, enter your server-side GTM container ID
   - Configure the server URL
   - Test the connection

### Step 3: Update Your Website (15 minutes)

#### A. Add Server-Side Tracking Provider to Layout

Update your `src/app/layout.tsx`:

```typescript
import ServerSideTrackingProvider from '@/components/ServerSideTracking';
import ServerSideTrackingTester from '@/components/ServerSideTrackingTester';

// In your layout component, wrap your app:
<ServerSideTrackingProvider>
  <MetaPixelProvider>
    <CTAProvider>
      {/* Your existing components */}
      <ServerSideTrackingTester />
    </CTAProvider>
  </MetaPixelProvider>
</ServerSideTrackingProvider>
```

#### B. Add Environment Variables

Add to your `.env.local`:

```bash
# Server-Side Tracking Configuration
NEXT_PUBLIC_STAPE_URL=https://your-container.stape.io
NEXT_PUBLIC_SERVER_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_ENABLE_SERVER_SIDE_TRACKING=true
```

#### C. Update Your GTM Configuration

Replace your existing GTM script in `layout.tsx` with:

```javascript
// Server-side GTM snippet
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      '${process.env.NEXT_PUBLIC_STAPE_URL}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_SERVER_GTM_ID}');
    `,
  }}
/>
```

### Step 4: Configure Meta Pixel in Server-Side GTM (20 minutes)

1. **In your Server-Side GTM Container:**
   - Add "Meta Conversions API" tag template
   - Configure with your Meta Pixel ID: `1444050970227269`
   - Set up triggers for server-side events

2. **Configure Event Mapping:**
   - Map `server_side_lead` → Meta `Lead` event
   - Map `server_side_form_submission` → Meta `CompleteRegistration` event
   - Map `server_side_conversion` → Meta `Purchase` event
   - Map `server_side_page_view` → Meta `PageView` event

3. **Add Meta Pixel Access Token:**
   - Go to Meta Business Manager
   - Generate Conversions API access token
   - Add token to your server-side GTM configuration

### Step 5: Test Your Implementation (10 minutes)

1. **Deploy Your Changes:**
   ```bash
   npm run build
   git add .
   git commit -m "Add server-side tracking with Stape integration"
   git push
   ```

2. **Test Server-Side Tracking:**
   - Visit: `https://www.eduexpressint.com?test-server-side`
   - Click "Show Server-Side Tester" button
   - Run test events
   - Check Meta Events Manager for server-side events

3. **Verify in GTM Preview:**
   - Enable GTM Preview mode
   - Check that events are being sent to server-side container
   - Verify Meta Conversions API events

## Expected Results

### Before Server-Side Tracking:
- ~60-70% conversion tracking accuracy
- Ad blocker interference
- iOS 14.5+ data loss
- Limited cross-device tracking

### After Server-Side Tracking:
- ~85-95% conversion tracking accuracy
- Bypass ad blockers
- Better iOS compliance
- Enhanced attribution

## Troubleshooting

### Common Issues:

1. **Events not appearing in Meta Events Manager:**
   - Check Meta Pixel Access Token
   - Verify Conversions API configuration
   - Ensure event mapping is correct

2. **GTM Preview not showing server events:**
   - Verify Stape URL is correct
   - Check server-side GTM container ID
   - Ensure dataLayer events are being pushed

3. **High server request usage:**
   - Optimize event frequency
   - Consider upgrading Stape plan
   - Implement event deduplication

### Debug Steps:

1. **Check Browser Console:**
   ```javascript
   // Check dataLayer events
   console.log(window.dataLayer);
   
   // Check last 10 events
   console.log(window.dataLayer.slice(-10));
   ```

2. **Verify Stape Container:**
   - Check Stape dashboard for incoming requests
   - Monitor request volume and errors
   - Verify GTM container connection

3. **Test Meta Events:**
   - Use Meta Pixel Helper extension
   - Check Events Manager Test Events
   - Verify Conversions API events

## Cost Optimization

### Free Tier Usage (10,000 requests/month):
- Estimated coverage: ~300-500 daily visitors
- Optimize by:
  - Reducing redundant events
  - Implementing smart event batching
  - Focusing on high-value conversions

### When to Upgrade:
- Exceeding 10,000 requests/month
- Need for enhanced support
- Require additional features
- Higher traffic volume

## Advanced Configuration

### Custom Event Parameters:
```javascript
// Enhanced lead tracking with custom parameters
serverSideTracking.trackServerSideLead({
  email: 'user@example.com',
  phone: '+1234567890',
  firstName: 'John',
  lastName: 'Doe',
  destination: 'United Kingdom',
  studyLevel: 'Masters',
  programType: 'Computer Science',
  source: 'Facebook Ad',
  campaign: 'UK Masters 2024',
  adset: 'Computer Science',
  ad: 'Best Universities',
  value: 1,
  currency: 'USD'
});
```

### Event Deduplication:
```javascript
// Add deduplication ID to prevent duplicate events
window.dataLayer.push({
  event: 'server_side_lead',
  event_name: 'Lead',
  deduplication_id: `lead_${Date.now()}_${Math.random()}`,
  // ... other parameters
});
```

## Monitoring & Analytics

### Key Metrics to Track:
1. **Conversion Rate Improvement:** Compare before/after server-side implementation
2. **Attribution Accuracy:** Monitor campaign performance improvements
3. **Data Quality:** Track event delivery success rates
4. **Cost Efficiency:** Monitor Stape usage vs. conversion improvements

### Recommended Dashboards:
1. **Meta Events Manager:** Monitor conversion events and attribution
2. **GTM Debug Console:** Track server-side event processing
3. **Stape Dashboard:** Monitor request volume and performance
4. **Google Analytics:** Compare traffic and conversion data

## Support & Resources

### Documentation:
- [Stape Documentation](https://help.stape.io/)
- [Meta Conversions API Guide](https://developers.facebook.com/docs/marketing-api/conversions-api/)
- [Server-Side GTM Guide](https://developers.google.com/tag-manager/serverside)

### Community:
- [Stape Community](https://community.stape.io/)
- [GTM Community](https://www.simoahava.com/)
- [Meta Developer Community](https://developers.facebook.com/community/)

### Professional Support:
- Stape offers professional setup services
- Consider hiring a GTM specialist for complex implementations
- Meta provides Conversions API support for business accounts

## Next Steps

1. **Week 1:** Complete basic setup and testing
2. **Week 2:** Monitor data quality improvements
3. **Week 3:** Optimize event configuration and reduce costs
4. **Week 4:** Analyze ROI and plan advanced features

Remember: Server-side tracking is a powerful tool that can significantly improve your conversion tracking accuracy and campaign performance. Start with the free tier and scale as needed based on your results.
