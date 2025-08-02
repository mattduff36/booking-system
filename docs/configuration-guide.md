# Configuration Guide

This guide covers all configuration options available in the booking system template.

## Business Configuration

### Core Business Settings (`config/business.json`)

```json
{
  "business": {
    "name": "Your Business Name",           // Full business name
    "shortName": "Your Business",           // Abbreviated name for UI
    "description": "Business description",   // SEO and about page description
    "tagline": "Your tagline",              // Marketing tagline
    "industry": "event-services",           // Industry preset to use
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
    },
    "serviceArea": "Your Service Area",     // Geographic service area
    "website": "https://yourbusiness.com"
  }
}
```

### Service Configuration

```json
{
  "services": {
    "terminology": "services",              // services|equipment|venues|products
    "categories": [
      {
        "id": "premium",
        "name": "Premium Services",
        "description": "Top-tier offerings"
      }
    ]
  }
}
```

### Branding Options

```json
{
  "branding": {
    "primaryColor": "#0070f3",              // Main brand color
    "secondaryColor": "#ff6b35",            // Secondary brand color
    "accentColor": "#00d2ff",               // Accent color
    "logoPath": "/logo.png",                // Path to your logo
    "faviconPath": "/favicon.ico"           // Path to favicon
  }
}
```

### SEO Configuration

```json
{
  "seo": {
    "metaTitle": "Your Business | Service Provider",
    "metaDescription": "Professional service description",
    "keywords": "relevant, keywords, for, seo",
    "ogImage": "/og-image.jpg"              // Social media preview image
  }
}
```

## Industry Presets

Choose from pre-configured industry templates in `config/industry-presets.json`:

### Event Services
- **Terminology**: "equipment"
- **Use Case**: Bounce houses, party equipment, entertainment
- **Sample Services**: Party castles, equipment packages

### Equipment Rental  
- **Terminology**: "equipment"
- **Use Case**: Construction tools, machinery, industrial equipment
- **Sample Services**: Power tools, heavy machinery

### Appointment Booking
- **Terminology**: "services" 
- **Use Case**: Consultations, professional services
- **Sample Services**: Initial consultation, follow-up sessions

### Venue Booking
- **Terminology**: "venues"
- **Use Case**: Event spaces, meeting rooms
- **Sample Services**: Ballrooms, conference centers

## Environment Variables

### Required Variables

```env
# Database Connection
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# Authentication
NEXTAUTH_SECRET="your-secret-key-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"

# Admin Access
ADMIN_EMAILS="admin@yourbusiness.com,manager@yourbusiness.com"
```

### Optional Variables

```env
# Business Override (overrides config/business.json)
BUSINESS_NAME="Environment Business Name"
BUSINESS_EMAIL="env@business.com"
BUSINESS_PHONE="+1 (555) 000-0000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Configuration (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Calendar Integration (Optional)
GOOGLE_CALENDAR_ID="calendar-id@group.calendar.google.com"
GOOGLE_SERVICE_ACCOUNT_EMAIL="service@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nkey\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID="your-google-project-id"

# Analytics (Optional)
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
```

## Service Data Configuration

### Default Services (`data/services.json`)

```json
[
  {
    "id": 1,                                // Unique identifier
    "name": "Service Name",                 // Display name
    "category": "premium",                  // Category from business config
    "size": "Large",                        // Size description
    "price": 150,                          // Price in your currency
    "description": "Service description",   // Full description
    "imageUrl": "/service-image.jpg",      // Image path
    "features": [                          // Feature list
      "Professional quality",
      "Fully insured"
    ],
    "availability": "Available year-round", // Availability info
    "duration": "Full day service"         // Duration info
  }
]
```

### Industry Sample Data

Located in `data/sample-data/`:
- `event-services.json` - Party and event equipment
- `equipment-rental.json` - Tools and machinery
- `appointment-booking.json` - Professional services
- `venue-booking.json` - Event spaces

## Database Configuration

### Connection Options

**Local PostgreSQL:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/booking_system"
```

**Hosted Services:**
```env
# Vercel Postgres
DATABASE_URL="postgresql://user:pass@db.region.postgres.vercel-storage.com:5432/verceldb"

# Supabase
DATABASE_URL="postgresql://user:pass@db.region.supabase.co:5432/postgres"

# AWS RDS
DATABASE_URL="postgresql://user:pass@instance.region.rds.amazonaws.com:5432/dbname"
```

## Feature Toggles

Control which features are enabled:

```json
{
  "features": {
    "bookingSystem": true,                  // Enable/disable booking functionality
    "onlinePayments": true,                 // Enable payment processing
    "calendarIntegration": true,            // Google Calendar sync
    "emailNotifications": true,             // Automated emails
    "adminPanel": true                      // Admin dashboard access
  }
}
```

## Customization Tips

### 1. Start with Industry Preset
Choose the closest industry preset and customize from there.

### 2. Update Service Data
Replace sample services with your actual offerings.

### 3. Brand Colors
Update `primaryColor` and `secondaryColor` to match your brand.

### 4. Contact Information
Ensure all contact details are accurate across config files.

### 5. SEO Optimization
Customize meta titles, descriptions, and keywords for your market.

### 6. Test Configuration
Use the dev server to test all configuration changes before deployment.

## Configuration Validation

The system validates your configuration on startup. Common errors:

- **Missing required fields**: Ensure all required business fields are filled
- **Invalid industry**: Check that industry matches available presets  
- **Invalid colors**: Use valid hex color codes for branding
- **Missing images**: Ensure all referenced image paths exist

## Advanced Configuration

### Custom Industry Preset

Add your own industry configuration to `config/industry-presets.json`:

```json
{
  "presets": {
    "your-industry": {
      "business": {
        "name": "Industry Business Name",
        "description": "Industry-specific description"
      },
      "services": {
        "terminology": "products",
        "pageTitle": "Our Products",
        "categories": [...]
      },
      "seo": {
        "metaTitle": "Industry-specific title",
        "keywords": "industry, specific, keywords"
      }
    }
  }
}
```

### Configuration Priority

Settings are applied in this order (later overrides earlier):
1. Default configuration
2. Industry preset
3. `config/business.json`
4. Environment variables

This allows flexible configuration across different deployment environments.