# Logo Setup Guide

This guide explains how to set up and replace the logo in the EduExpress International application.

## Current Setup

The application has been configured to use logo images in the following components:

- **Navbar**: Uses `/logo.png` (40x40px)
- **Footer**: Uses `/logo.png` (64x64px)  
- **Structured Data**: References `/logo.png` for SEO

## How to Replace the Logo

### Step 1: Replace the Main Logo File

1. Replace the file at `public/logo.png` with your new logo
2. Recommended format: PNG with transparent background
3. Recommended size: At least 256x256px for best quality

### Step 2: Generate Multiple Sizes (Optional)

If you want optimized versions for different use cases, run the logo generation script:

```bash
# Install Sharp if not already installed
npm install sharp

# Generate multiple logo sizes
node scripts/generate-logo-sizes.mjs
```

This will create optimized versions in `public/brand/` directory:
- `logo-24.png` - Navbar small
- `logo-32.png` - Navbar medium  
- `logo-48.png` - Navbar large
- `logo-64.png` - Footer standard
- `logo-96.png` - Footer large
- `logo-128.png` - General medium
- `logo-256.png` - General large
- `logo-base.png` - Original size, optimized

### Step 3: Update Components (If Using Generated Sizes)

If you generated multiple sizes and want to use them instead of the main logo.png:

#### Update Navbar Component
Edit `src/components/Navbar.tsx`:
```tsx
<Image
  src="/brand/logo-32.png"  // or logo-48.png
  alt="EduExpress International Logo"
  width={40}
  height={40}
  className="w-full h-full object-contain"
  priority
/>
```

#### Update Footer Component  
Edit `src/components/Footer.tsx`:
```tsx
<Image
  src="/brand/logo-64.png"  // or logo-96.png
  alt="EduExpress International Logo"
  width={64}
  height={64}
  className="w-full h-full object-contain"
/>
```

## Logo Requirements

### Technical Requirements
- **Format**: PNG (recommended) or SVG
- **Background**: Transparent
- **Minimum Size**: 256x256px
- **Aspect Ratio**: Square (1:1) recommended

### Design Guidelines
- **Readability**: Should be clear at small sizes (24px)
- **Contrast**: Should work on both light and dark backgrounds
- **Brand Consistency**: Should match your brand colors and style

## File Structure

```
public/
├── logo.png                    # Main logo file (used by components)
└── brand/
    ├── logo-24.png            # Small navbar
    ├── logo-32.png            # Medium navbar
    ├── logo-48.png            # Large navbar
    ├── logo-64.png            # Footer standard
    ├── logo-96.png            # Footer large
    ├── logo-128.png           # General medium
    ├── logo-256.png           # General large
    ├── logo-base.png          # Original optimized
    └── logo-on-dark-*.png     # Dark theme variants
```

## Testing

After replacing the logo:

1. **Check Navbar**: Logo should display correctly in the top navigation
2. **Check Footer**: Logo should display correctly in the footer
3. **Check Responsiveness**: Logo should scale properly on different screen sizes
4. **Check Performance**: Logo should load quickly and not affect page speed

## Troubleshooting

### Logo Not Displaying
- Check file path is correct (`/logo.png`)
- Verify file exists in `public/` directory
- Check browser console for 404 errors

### Logo Too Large/Small
- Adjust the `width` and `height` props in Image components
- Use different size variants from `public/brand/` directory

### Poor Quality
- Use higher resolution source image (at least 256x256px)
- Ensure source image is not compressed
- Consider using SVG format for vector logos

## Support

If you encounter issues with logo setup, check:
1. File permissions
2. File format compatibility
3. Next.js Image component requirements
4. Browser console for errors
