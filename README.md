# EduExpress International

A comprehensive education platform for international students seeking university admissions, scholarships, and study abroad opportunities.

## Features

- **University Database**: Comprehensive database of international universities with detailed information
- **Destination Guides**: Country-specific study guides and information
- **Scholarship Support**: Scholarship opportunities and application assistance
- **Career Guidance**: Professional career counseling and guidance
- **Visa Assistance**: Visa application support and guidance
- **Admin Dashboard**: Complete admin panel for managing universities, leads, and content
- **Lead Management**: B2B and B2C lead tracking and management
- **Analytics Integration**: Meta Pixel and Google Tag Manager integration
- **Success Stories**: Student success stories and testimonials

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based authentication
- **Analytics**: Meta Pixel, Google Tag Manager
- **UI Components**: Radix UI, Lucide React Icons

## Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm, yarn, pnpm, or bun

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd edu-express
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/edu-express
   
   # JWT Secret (Generate a strong secret for production)
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here
   
   # Meta Pixel Configuration
   NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id_here
   
   # Google Tag Manager Configuration
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   
   # Admin Configuration
   ADMIN_EMAIL=admin@eduexpress.info
   ADMIN_PASSWORD=admin123
   ```

4. **Set up the database**
   
   Make sure MongoDB is running locally or configure MongoDB Atlas connection string.

5. **Create admin user**
   ```bash
   npm run create-admin
   ```

6. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run gen:icons` - Generate app icons
- `npm run create-admin` - Create admin user

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── destinations/      # Destination pages
│   ├── services/          # Service pages
│   └── universities/      # University pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # Reusable UI components
│   └── ...               # Other components
├── lib/                  # Utility functions and configurations
├── models/               # MongoDB models
└── contexts/             # React contexts
```

## Configuration

### Environment Variables

See `env.example` for all available environment variables. Key variables include:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NEXT_PUBLIC_META_PIXEL_ID`: Meta Pixel ID for analytics
- `NEXT_PUBLIC_GTM_ID`: Google Tag Manager ID
- `ADMIN_EMAIL` & `ADMIN_PASSWORD`: Admin credentials

### Database Models

- **University**: University information, programs, scholarships
- **Lead**: Student lead information
- **B2BLead**: Business partnership leads
- **StudentSuccessStory**: Student success stories
- **Update**: News and updates
- **User**: Admin users
- **Destination**: Country/destination information

## Admin Dashboard

Access the admin dashboard at `/admin` with your admin credentials.

Features:
- University management (CRUD operations)
- Lead management (B2B and B2C)
- Success story management
- Update/news management
- User management
- Analytics and statistics

## API Endpoints

- `GET /api/universities` - Get universities with filtering
- `POST /api/universities` - Create new university
- `PUT /api/universities` - Update university
- `DELETE /api/universities` - Delete university
- `GET /api/leads` - Get leads
- `POST /api/leads` - Create new lead
- `GET /api/destinations` - Get destinations
- `GET /api/success-stories` - Get success stories
- `GET /api/updates` - Get updates/news

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: admin@eduexpress.info
- Create an issue in the repository

## Documentation

Additional documentation:
- [Logo Setup Guide](LOGO_SETUP.md)
- [Meta Pixel Integration](META_PIXEL_INTEGRATION.md)
- [Simple Edit Guide](SIMPLE_EDIT_README.md)
