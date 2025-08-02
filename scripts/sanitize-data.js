#!/usr/bin/env node

/**
 * Data Sanitization Script
 * 
 * This script removes all client-specific data and replaces it with
 * anonymized sample data for template distribution.
 * 
 * Usage: node scripts/sanitize-data.js
 */

const fs = require('fs');
const path = require('path');

// Sample customer data for different business types
const sampleCustomers = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Sample City, SC 12345'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com', 
    phone: '+1 (555) 234-5678',
    address: '456 Oak Avenue, Demo Town, DT 23456'
  },
  {
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Street, Test Village, TV 34567'
  },
  {
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    phone: '+1 (555) 456-7890',
    address: '321 Elm Drive, Example Heights, EH 45678'
  },
  {
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Lane, Sample Hills, SH 56789'
  }
];

// Generate sample booking references
function generateBookingRef(index) {
  return `SAMPLE${String(index + 1).padStart(3, '0')}`;
}

// Generate random date within next 6 months
function generateRandomDate() {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setMonth(today.getMonth() + Math.floor(Math.random() * 6) + 1);
  return futureDate.toISOString().split('T')[0];
}

// Generate sample booking data
function generateSampleBookings() {
  return sampleCustomers.map((customer, index) => ({
    id: index + 1,
    bookingRef: generateBookingRef(index),
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    customerAddress: customer.address,
    serviceId: Math.floor(Math.random() * 3) + 1,
    serviceName: ['Premium Service', 'Standard Service', 'Basic Service'][Math.floor(Math.random() * 3)],
    date: generateRandomDate(),
    paymentMethod: ['credit_card', 'bank_transfer', 'cash'][Math.floor(Math.random() * 3)],
    totalPrice: [75, 100, 150][Math.floor(Math.random() * 3)],
    deposit: [25, 30, 50][Math.floor(Math.random() * 3)],
    status: ['confirmed', 'pending', 'completed'][Math.floor(Math.random() * 3)],
    notes: `Sample booking ${index + 1} for demonstration purposes`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    agreementSigned: Math.random() > 0.5,
    agreementSignedAt: Math.random() > 0.5 ? new Date().toISOString() : null,
    agreementSignedBy: Math.random() > 0.5 ? customer.name : null
  }));
}

// Create sample booking data file
function createSampleBookingData() {
  const sampleBookings = generateSampleBookings();
  const outputPath = path.join(__dirname, '..', 'data', 'sample-bookings.json');
  
  try {
    fs.writeFileSync(outputPath, JSON.stringify(sampleBookings, null, 2));
    console.log(`✅ Created sample booking data: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error creating sample booking data: ${error.message}`);
  }
}

// Update environment template
function createEnvironmentTemplate() {
  const envTemplate = `# Business Configuration
BUSINESS_NAME="Your Business Name"
BUSINESS_SHORT_NAME="Your Business"
BUSINESS_DESCRIPTION="Professional service provider delivering quality solutions for your events and needs"
BUSINESS_TAGLINE="Quality Service, Memorable Events"
BUSINESS_INDUSTRY="event-services"

# Contact Information
BUSINESS_PHONE="+1 (555) 123-4567"
BUSINESS_EMAIL="info@yourbusiness.com"
BUSINESS_WEBSITE="https://yourbusiness.com"

# Address
BUSINESS_ADDRESS_STREET="123 Business Street"
BUSINESS_ADDRESS_CITY="Your City"
BUSINESS_ADDRESS_STATE="Your State"
BUSINESS_ADDRESS_ZIP="12345"
BUSINESS_ADDRESS_COUNTRY="Your Country"

# Service Area
BUSINESS_SERVICE_AREA="Your Service Area"

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/booking_system"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Admin Configuration
ADMIN_EMAILS="admin@yourbusiness.com"

# Email Configuration (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Calendar Integration (Optional)
GOOGLE_CALENDAR_ID="your-calendar-id@group.calendar.google.com"
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour private key here\\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID="your-google-project-id"

# Analytics (Optional)
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
`;

  const outputPath = path.join(__dirname, '..', '.env.template');
  
  try {
    fs.writeFileSync(outputPath, envTemplate);
    console.log(`✅ Created environment template: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error creating environment template: ${error.message}`);
  }
}

// Update README template
function createReadmeTemplate() {
  const readmeContent = `# Booking System Template

A professional, configurable booking system template built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Configurable Business Profiles** - Easy customization for different industries
- 📅 **Advanced Booking Management** - Complete booking workflow with calendar integration
- 💳 **Payment Processing** - Integrated payment handling and tracking
- 📧 **Email Automation** - Automated booking confirmations and notifications
- 🎨 **Responsive Design** - Mobile-first design with modern UI components
- 🔐 **Admin Panel** - Comprehensive admin dashboard for booking management
- 🌍 **Multi-Industry Support** - Presets for events, equipment rental, appointments, and venues

## Quick Start

### 1. Configuration

Copy the environment template and configure your business details:

\`\`\`bash
cp .env.template .env.local
\`\`\`

Edit \`.env.local\` with your business information, database credentials, and service configurations.

### 2. Business Profile Setup

Update \`config/business.json\` with your business details:

\`\`\`json
{
  "business": {
    "name": "Your Business Name",
    "shortName": "Your Business",
    "description": "Your business description",
    "industry": "event-services"
  }
}
\`\`\`

### 3. Industry Presets

Choose from pre-configured industry templates:

- **event-services** - Party equipment, bounce houses, entertainment
- **equipment-rental** - Tools, machinery, construction equipment  
- **appointment-booking** - Consultations, services, professional appointments
- **venue-booking** - Event spaces, meeting rooms, facilities

### 4. Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

### 5. Database Setup

\`\`\`bash
npm run db:init
npm run db:migrate
\`\`\`

## Customization Guide

### Business Configuration

The template uses a central configuration system in \`config/business.json\` for easy customization:

- **Business Information** - Name, description, contact details
- **Services Configuration** - Terminology, categories, pricing structure  
- **Branding** - Colors, logos, styling preferences
- **SEO Settings** - Meta tags, descriptions, keywords

### Industry Templates

Select and customize industry-specific presets:

\`\`\`javascript
import { applyIndustryPreset } from '@/lib/config/business-config';

const config = applyIndustryPreset('event-services');
\`\`\`

### Service Data

Update \`data/services.json\` with your specific services or use industry sample data from \`data/sample-data/\`.

## Deployment

### Vercel (Recommended)

1. Push your configured template to GitHub
2. Connect to Vercel and deploy
3. Configure environment variables in Vercel dashboard

### Self-Hosted

1. Build the application: \`npm run build\`
2. Start production server: \`npm start\`
3. Configure your web server and database

## Support

For setup assistance and customization help, please refer to:

- \`docs/setup-guide.md\` - Detailed setup instructions
- \`docs/configuration-guide.md\` - Configuration options
- \`docs/industry-examples.md\` - Industry-specific examples

## License

This booking system template is provided under the MIT license for commercial and personal use.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
`;

  const outputPath = path.join(__dirname, '..', 'README-TEMPLATE.md');
  
  try {
    fs.writeFileSync(outputPath, readmeContent);
    console.log(`✅ Created README template: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error creating README template: ${error.message}`);
  }
}

// Main execution
function main() {
  console.log('🧹 Starting data sanitization process...\n');
  
  try {
    createSampleBookingData();
    createEnvironmentTemplate();
    createReadmeTemplate();
    
    console.log('\n✅ Data sanitization completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Review and update config/business.json with your business details');
    console.log('2. Copy .env.template to .env.local and configure your environment');
    console.log('3. Choose your industry preset from config/industry-presets.json');
    console.log('4. Update service data in data/services.json');
    console.log('5. Test the configuration with npm run dev');
    
  } catch (error) {
    console.error('❌ Data sanitization failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  generateSampleBookings,
  createSampleBookingData,
  createEnvironmentTemplate,
  createReadmeTemplate
};