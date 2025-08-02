# Booking System Template - Setup Guide

A professional, configurable booking system template built with Next.js, TypeScript, and Tailwind CSS.

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (local or hosted)
- Git

### 1. Clone and Install

```bash
git clone https://github.com/mattduff36/booking-system.git your-project-name
cd your-project-name
npm install
```

### 2. Environment Configuration

Copy the environment template:

```bash
cp .env.template .env.local
```

Update `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_db_name"

# Business Configuration
BUSINESS_NAME="Your Business Name"
BUSINESS_EMAIL="info@yourbusiness.com"
BUSINESS_PHONE="+1 (555) 123-4567"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Admin Email
ADMIN_EMAILS="admin@yourbusiness.com"
```

### 3. Business Profile Setup

Update `config/business.json` with your business details:

```json
{
  "business": {
    "name": "Your Business Name",
    "shortName": "Your Business",
    "description": "Your business description",
    "tagline": "Your tagline",
    "industry": "event-services"
  },
  "contact": {
    "phone": "+1 (555) 123-4567",
    "email": "info@yourbusiness.com",
    "address": {
      "street": "123 Business Street",
      "city": "Your City",
      "state": "Your State",
      "zip": "12345",
      "country": "Your Country"
    }
  }
}
```

### 4. Choose Industry Preset

Select from available industry templates in `config/industry-presets.json`:

- **event-services** - Party equipment, bounce houses, entertainment
- **equipment-rental** - Tools, machinery, construction equipment
- **appointment-booking** - Consultations, services, professional appointments  
- **venue-booking** - Event spaces, meeting rooms, facilities

Update your `business.json` industry field to match your chosen preset.

### 5. Database Setup

```bash
# Initialize the database
npm run db:init

# Run migrations (if any)
npm run db:migrate
```

### 6. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your booking system!

## Customization

### Service Data

Update your services in `data/services.json` or use industry-specific samples from `data/sample-data/`:

```json
[
  {
    "id": 1,
    "name": "Premium Service",
    "category": "premium",
    "size": "Large",
    "price": 150,
    "description": "Your service description",
    "imageUrl": "/your-service-image.jpg"
  }
]
```

### Branding

Update colors, logos, and styling in `config/business.json`:

```json
{
  "branding": {
    "primaryColor": "#0070f3",
    "secondaryColor": "#ff6b35",
    "logoPath": "/your-logo.png"
  }
}
```

### Service Terminology

The system automatically adapts terminology based on your industry:

- **event-services**: "Equipment" 
- **equipment-rental**: "Equipment"
- **appointment-booking**: "Services"
- **venue-booking**: "Venues"

## Deployment

### Vercel (Recommended)

1. Push to GitHub repository
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Self-Hosted

```bash
npm run build
npm start
```

## Admin Access

1. Sign in at `/admin/signin`
2. Use the email configured in `ADMIN_EMAILS`
3. Access booking management, service management, and reports

## Support

For setup assistance:

- Check `docs/configuration-guide.md` for detailed configuration options
- Review `docs/industry-examples.md` for industry-specific setups
- Run `node scripts/sanitize-data.js` to reset to clean template state

## Features

✅ **Complete Booking System**
- Online booking with calendar integration
- Payment processing and tracking
- Email notifications and confirmations
- Admin dashboard and management

✅ **Multi-Industry Support**
- Configurable terminology and workflows
- Industry-specific presets
- Flexible service/product management

✅ **Professional UI/UX**
- Responsive design with Tailwind CSS
- Modern components with Shadcn UI
- Accessibility compliant

✅ **Developer Friendly**
- TypeScript throughout
- Comprehensive documentation
- Easy customization and extension

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.