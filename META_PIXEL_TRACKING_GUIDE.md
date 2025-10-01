# Meta Pixel Tracking Implementation Guide

## Overview
Your website now has comprehensive Meta Pixel tracking implemented across all major pages and forms. The tracking system automatically captures user interactions and sends data to Facebook for better ad targeting and conversion tracking.

## What's Already Implemented

### ✅ Automatic Page View Tracking
- **Homepage** (`/`) - Tracks as "Homepage" ViewContent event
- **About Page** (`/about`) - Tracks as "About Us" ViewContent event
- **Contact Page** (`/contact`) - Tracks as "Contact Page" ViewContent event
- **Services Pages** - All service pages track ViewContent events
- **Destination Pages** - All destination pages track ViewContent events
- **University Pages** - Dynamic university pages track ViewContent events
- **Success Stories** (`/success-stories`) - Tracks ViewContent event
- **B2B Page** (`/b2b`) - Tracks ViewContent event
- **Scholarships Page** (`/scholarships`) - Tracks ViewContent event
- **Updates Page** (`/update`) - Tracks ViewContent event

### ✅ Form Submission Tracking
- **Lead Form** - Tracks both CompleteRegistration and Lead events
- **CTA Form** - Tracks both CompleteRegistration and Lead events
- **B2B Form** - Ready for tracking implementation

### ✅ Custom Event Tracking
- **Program Interest** - Tracks when users show interest in specific programs
- **Search Events** - Tracks search functionality
- **Custom Events** - Flexible system for any custom tracking needs

## How to Add Tracking to New Pages

### 1. For Static Pages
Add this import and hook to your page component:

```typescript
import { usePageTracking } from '@/hooks/usePageTracking';

export default function YourPage() {
  usePageTracking(); // This automatically tracks the page view
  
  // Your component logic...
}
```

### 2. For Dynamic Pages (like university pages)
Use the specific tracking hook:

```typescript
import { useUniversityTracking } from '@/hooks/usePageTracking';

export default function UniversityPage({ university }) {
  useUniversityTracking(university.id, university.name);
  
  // Your component logic...
}
```

### 3. For Forms
Use the form tracking hook:

```typescript
import { useFormTracking } from '@/hooks/usePageTracking';

export default function YourForm() {
  const { trackFormSubmission } = useFormTracking();
  
  const handleSubmit = async (formData) => {
    // Track the form submission
    trackFormSubmission({
      form_name: 'Your Form Name',
      form_type: 'Lead Generation',
      content_name: 'Form Submission',
      value: 1,
      currency: 'USD',
      email: formData.email,
      phone: formData.phone,
      destination: formData.destination,
      program: formData.program,
      source: 'Your Page'
    });
    
    // Your form submission logic...
  };
}
```

### 4. For Custom Events
Use the custom event tracking:

```typescript
import { usePageTracking } from '@/hooks/usePageTracking';

export default function YourComponent() {
  const { trackCustomEvent } = usePageTracking();
  
  const handleCustomAction = () => {
    trackCustomEvent('CustomEventName', {
      custom_property: 'value',
      another_property: 'another_value'
    });
  };
}
```

## Available Tracking Functions

### Page Tracking
- `usePageTracking()` - Automatic page view tracking
- `useUniversityTracking(id, name)` - University-specific tracking

### Form Tracking
- `useFormTracking()` - Form submission and lead tracking
- `trackFormSubmission(data)` - Track form completions
- `trackLead(data)` - Track lead generation

### Custom Tracking
- `trackCustomEvent(eventName, data)` - Track any custom event
- `trackViewContent(data)` - Track content views
- `trackSearch(data)` - Track search events
- `trackAddToCart(data)` - Track program interest

## Event Data Structure

### ViewContent Events
```typescript
{
  content_name: string;        // "Study in UK"
  content_category: string;    // "Destinations"
  content_ids: string[];       // ["uk"]
  value?: number;              // 0
  currency?: string;           // "USD"
}
```

### Lead Events
```typescript
{
  content_name: string;        // "Lead Generated"
  content_category: string;    // "Education"
  value: number;               // 1
  currency: string;            // "USD"
  email?: string;              // "user@example.com"
  phone?: string;              // "+1234567890"
  destination?: string;        // "UK"
  university?: string;         // "University Name"
  program?: string;            // "Computer Science"
  source?: string;             // "Website"
}
```

### Form Submission Events
```typescript
{
  form_name: string;           // "Contact Form"
  form_type: string;           // "Lead Generation"
  content_name: string;        // "Form Submission"
  value: number;               // 1
  currency: string;            // "USD"
}
```

## Testing Your Tracking

### 1. Facebook Pixel Helper
Install the Facebook Pixel Helper Chrome extension to verify tracking is working.

### 2. Browser Console
Check the browser console for tracking logs:
- "Meta Pixel ViewContent tracked: ..."
- "Meta Pixel Lead tracked: ..."
- "Meta Pixel Form Submission tracked: ..."

### 3. Facebook Events Manager
Check your Facebook Events Manager to see real-time events.

## Adding New Pages to Auto-Tracking

To add a new page to the automatic tracking system, update the `PAGE_TRACKING_CONFIG` in `/src/hooks/usePageTracking.ts`:

```typescript
const PAGE_TRACKING_CONFIG = {
  // Add your new page here
  '/your-new-page': {
    event: 'ViewContent',
    data: {
      content_name: 'Your Page Name',
      content_category: 'Your Category',
      content_ids: ['your-page-id']
    }
  },
  // ... existing pages
};
```

## Best Practices

1. **Always track page views** - Use `usePageTracking()` on every page
2. **Track form submissions** - Use `useFormTracking()` for all forms
3. **Use meaningful event names** - Be descriptive with your event names
4. **Include relevant data** - Add as much context as possible to your events
5. **Test thoroughly** - Always test tracking in development before deploying

## Troubleshooting

### Tracking Not Working?
1. Check if Meta Pixel is loaded: `window.fbq` should exist
2. Check browser console for errors
3. Verify the pixel ID is correct (1444050970227269)
4. Use Facebook Pixel Helper to debug

### Events Not Appearing in Facebook?
1. Wait 15-20 minutes for events to appear
2. Check if you're in the correct Facebook ad account
3. Verify the pixel ID matches your Facebook ad account
4. Check for ad blockers or privacy settings

## Support

If you need help implementing tracking on additional pages or have questions about the tracking system, refer to this guide or check the implementation in the existing pages for examples.
