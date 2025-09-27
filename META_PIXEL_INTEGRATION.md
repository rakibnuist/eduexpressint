# Meta Pixel Integration for EduExpress Dashboard Lead Manager

## Overview
This document outlines the Meta Pixel integration implemented for the EduExpress Dashboard Lead Manager. The integration provides comprehensive tracking of lead generation events, form submissions, and user interactions across the platform.

## Features Implemented

### 1. Meta Pixel Provider Component (`src/components/MetaPixel.tsx`)
- **Initialization**: Automatically initializes Meta Pixel on app load
- **Configuration**: Uses environment variable `NEXT_PUBLIC_META_PIXEL_ID`
- **Debug Mode**: Enables debug logging in development environment
- **Page View Tracking**: Automatically tracks page views

### 2. Enhanced Tracking Functions (`src/components/TrackLead.tsx`)
- **Lead Tracking**: Comprehensive lead generation tracking with detailed metadata
- **Form Submission Tracking**: Tracks form submissions with form-specific data
- **Content View Tracking**: Tracks when users view specific content (universities, destinations)
- **Search Tracking**: Tracks search queries and results
- **Dual Analytics**: Supports both Meta Pixel and Google Analytics tracking

### 3. Lead Management Integration
- **Admin Dashboard**: Tracks lead creation, updates, and management actions
- **Lead Form Component**: Enhanced with Meta Pixel tracking for form submissions
- **CTA Form**: Comprehensive tracking of consultation form submissions

## Events Tracked

### Lead Generation Events
- `Lead` - When a new lead is created or updated
- `CompleteRegistration` - When forms are submitted
- `ViewContent` - When users view university or destination pages
- `Search` - When users perform searches
- `AddToCart` - When users add programs to their interest list

### Event Data Structure
```typescript
interface LeadEventData {
  content_name: string;
  content_category: string;
  value: number;
  currency: string;
  email?: string;
  phone?: string;
  destination?: string;
  university?: string;
  program?: string;
  source?: string;
}
```

## Setup Instructions

### 1. Environment Configuration
Add your Meta Pixel ID to your environment variables:
```bash
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id_here
```

### 2. Meta Pixel ID Setup
1. Go to [Facebook Business Manager](https://business.facebook.com/)
2. Navigate to Events Manager
3. Create a new Pixel or use an existing one
4. Copy the Pixel ID
5. Add it to your `.env.local` file

### 3. Verification
The integration includes console logging for debugging. Check browser console for:
- "Meta Pixel initialized with ID: [your_pixel_id]"
- "Meta Pixel Lead tracked: [event_data]"
- "Meta Pixel Form Submission tracked: [form_data]"

## Usage Examples

### Basic Lead Tracking
```typescript
import { trackLead } from '@/components/TrackLead';

trackLead('New Lead Generated', {
  email: 'user@example.com',
  phone: '+1234567890',
  destination: 'United Kingdom',
  source: 'Website',
  value: 1,
  currency: 'USD'
});
```

### Form Submission Tracking
```typescript
import { trackFormSubmission } from '@/components/TrackLead';

trackFormSubmission('Contact Form', {
  form_type: 'Lead Generation',
  lead_data: formData
});
```

### Content View Tracking
```typescript
import { trackViewContent } from '@/components/TrackLead';

trackViewContent('University Page View', {
  content_category: 'Education',
  content_ids: ['university_123'],
  value: 0
});
```

## Integration Points

### 1. Main Layout (`src/app/layout.tsx`)
- MetaPixelProvider wraps the entire application
- Ensures pixel is initialized on every page load

### 2. Lead Management Pages
- **Admin Leads Page** (`src/app/admin/leads/page.tsx`): Tracks lead creation via admin dashboard
- **Lead Form Component** (`src/components/admin/LeadForm.tsx`): Tracks form submissions and lead updates

### 3. CTA Form (`src/components/CTAForm.tsx`)
- Tracks consultation form submissions
- Captures detailed lead information including destination, study level, and program type

## Testing

### 1. Development Testing
- Enable debug mode by setting `NODE_ENV=development`
- Check browser console for tracking events
- Use Facebook Pixel Helper browser extension

### 2. Production Verification
- Use Facebook Events Manager to verify events are being received
- Check the "Test Events" section in Events Manager
- Monitor conversion tracking and attribution

## Customization

### Adding New Events
To add new tracking events, extend the `metaPixel` object in `MetaPixel.tsx`:

```typescript
// Add new tracking function
trackCustomEvent: (eventName: string, eventData: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID_HERE') {
    ReactPixel.track(eventName, eventData);
    console.log('Meta Pixel Custom Event tracked:', eventName, eventData);
  }
}
```

### Modifying Event Data
Update the event data structures in the tracking functions to include additional fields as needed.

## Troubleshooting

### Common Issues
1. **Pixel not initializing**: Check that `NEXT_PUBLIC_META_PIXEL_ID` is set correctly
2. **Events not tracking**: Verify pixel ID is valid and not the placeholder value
3. **Console errors**: Check for JavaScript errors that might prevent tracking

### Debug Mode
Enable debug mode by setting the environment variable:
```bash
NODE_ENV=development
```

## Privacy and Compliance

### Data Handling
- Email and phone data is only sent to Meta Pixel for conversion tracking
- No sensitive personal data is stored in tracking events
- All tracking is opt-in and can be disabled by users

### GDPR Compliance
- Ensure your privacy policy covers Meta Pixel usage
- Implement cookie consent mechanisms if required
- Provide users with opt-out options

## Performance Considerations

### Optimization
- Meta Pixel loads asynchronously to avoid blocking page load
- Tracking events are batched when possible
- Debug logging is disabled in production

### Monitoring
- Monitor page load times after pixel integration
- Use browser dev tools to verify pixel loading performance
- Check for any JavaScript errors related to tracking

## Support and Maintenance

### Regular Tasks
- Monitor pixel health in Facebook Events Manager
- Update tracking events as new features are added
- Review and optimize conversion tracking setup

### Updates
- Keep the `react-facebook-pixel` package updated
- Monitor for Meta Pixel API changes
- Update tracking implementation as needed

## Contact
For questions or issues with the Meta Pixel integration, refer to:
- [Meta Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel/)
- [Facebook Business Help Center](https://www.facebook.com/business/help)
- Internal development team for implementation-specific questions
