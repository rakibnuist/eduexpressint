# Simple University Edit Page

## Overview
A simplified university edit page for the admin dashboard that provides a clean, organized interface for editing university information based on the University model.

## Features

### Basic Information
- University name and URL slug
- Country and city selection
- University type (Public, Private, Community, Research, Technical)
- Description and short description

### SEO Information
- SEO title, description, and keywords
- Logo URL and cover image URL

### Rankings
- Global and national ranking inputs

### Status & Priority
- Active/Inactive toggle
- Featured status toggle
- Priority number input

### Academic Programs
- Add/remove programs with:
  - Program name and level
  - Duration in years
  - Tuition amount and currency

### Fees Information
- Application fee
- Tuition amount and currency
- Additional fee entries with type, amount, currency, and description

### Scholarships
- Add/remove scholarships with:
  - Scholarship name and type
  - Tuition fee coverage
  - Currency and description

### Admission Requirements
- General requirements (text area)
- Required documents (text area)
- Language test requirements with test name and minimum score

### FAQ Section
- Add/remove frequently asked questions with question and answer

### Scholarship Conditions
- Text area for scholarship conditions

## Usage

1. Navigate to the admin dashboard
2. Go to Universities management
3. Click the blue "Edit" button (Simple) for any university
4. Make your changes in the organized sections
5. Click "Save Changes" to update the university

## Technical Details

- Built with React and TypeScript
- Uses the existing University model structure
- Integrates with the existing API endpoints
- Responsive design with Tailwind CSS
- Form validation and error handling
- Success/error message display

## File Location
`/src/app/admin/universities/[id]/edit-simple/page.tsx`

## API Integration
Uses the existing `/api/universities` endpoint with PUT method for updates.
