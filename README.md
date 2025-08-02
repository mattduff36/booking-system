# Professional Booking System Template

A complete, configurable booking system template built with Next.js, TypeScript, and Tailwind CSS. Perfect for service-based businesses across multiple industries.

## ✨ Features

- 🎯 **Multi-Industry Support** - Event services, equipment rental, appointments, venues
- ⚙️ **Configurable Everything** - Business details, terminology, branding, and workflows
- 📅 **Complete Booking System** - Calendar integration, payments, notifications
- 👨‍💼 **Admin Dashboard** - Booking management, service management, reports
- 🎨 **Modern UI/UX** - Responsive design with Shadcn UI and Tailwind CSS
- 🔒 **Authentication & Security** - Secure admin access and data protection
- 📧 **Email Automation** - Booking confirmations and notifications
- 📱 **Mobile Responsive** - Perfect experience on all devices

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/mattduff36/booking-system.git your-project
cd your-project
npm install
```

### 2. Configure Your Business
```bash
cp .env.template .env.local
```

Update `config/business.json` with your details:
```json
{
  "business": {
    "name": "Your Business Name",
    "industry": "event-services",
    "contact": {
      "email": "info@yourbusiness.com",
      "phone": "+1 (555) 123-4567"
    }
  }
}
```

### 3. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see your booking system!

## 🏢 Industry Templates

Choose from pre-configured industry setups:

### 🎪 Event Services
Perfect for party rentals, bounce houses, entertainment equipment
- **Terminology**: Equipment, rentals, party packages
- **Sample Data**: Bounce houses, party equipment, entertainment services

### 🔧 Equipment Rental  
Ideal for tool rental, construction equipment, industrial machinery
- **Terminology**: Equipment, tools, machinery
- **Sample Data**: Power tools, construction equipment, industrial rentals

### 📅 Appointment Booking
Great for consultants, healthcare, professional services
- **Terminology**: Services, appointments, consultations  
- **Sample Data**: Consultation sessions, professional services

### 🏛️ Venue Booking
Perfect for event spaces, meeting rooms, facilities
- **Terminology**: Venues, spaces, facilities
- **Sample Data**: Ballrooms, conference rooms, event spaces

## 📚 Documentation

- **[Setup Guide](docs/setup-guide.md)** - Complete installation and configuration
- **[Configuration Guide](docs/configuration-guide.md)** - All configuration options
- **[Industry Examples](docs/industry-examples.md)** - Industry-specific setups

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL with connection pooling
- **Authentication**: NextAuth.js
- **Email**: SMTP integration
- **Calendar**: Google Calendar API integration
- **Deployment**: Vercel-ready with database support

## 📦 What's Included

```
booking-system/
├── config/                 # Business configuration
│   ├── business.json      # Main business settings  
│   └── industry-presets.json # Industry templates
├── data/                  # Service data
│   ├── services.json      # Your services
│   └── sample-data/       # Industry samples
├── docs/                  # Documentation
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/              # Utilities and configuration
│   └── hooks/            # Custom React hooks
└── scripts/              # Setup and utility scripts
```

## 🎨 Customization

### Business Configuration
- Update `config/business.json` with your business details
- Choose industry preset from `config/industry-presets.json`
- Customize branding colors, logos, and styling

### Service Management
- Add your services to `data/services.json`
- Use industry samples from `data/sample-data/`
- Configure categories, pricing, and descriptions

### Advanced Customization
- Modify components in `src/components/`
- Extend functionality in `src/lib/`
- Add custom styling with Tailwind CSS

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically

### Environment Variables
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
ADMIN_EMAILS=admin@yourbusiness.com
```

## 🎯 Perfect For

- **Web Designers** - Deliver professional booking systems to clients
- **Agencies** - Standardized solution for service-based businesses  
- **Developers** - Solid foundation for booking system projects
- **Business Owners** - Ready-to-use booking system for service businesses

## 📄 License

MIT License - Use for personal and commercial projects.

## 🤝 Support

- 📖 Check the [documentation](docs/)
- 🐛 Report issues on GitHub
- 💡 Request features via GitHub issues

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

Transform your service business with a professional booking system in minutes, not months!
