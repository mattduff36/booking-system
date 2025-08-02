# Industry-Specific Setup Examples

This guide provides complete setup examples for different industry types supported by the booking system template.

## Event Services (Bounce Houses, Party Equipment)

Perfect for party rental companies, entertainment services, and event equipment providers.

### Configuration

**Business Configuration:**
```json
{
  "business": {
    "name": "Premier Party Rentals",
    "shortName": "Premier Parties",
    "description": "Professional party equipment and entertainment services for unforgettable celebrations",
    "tagline": "Making Every Event Magical",
    "industry": "event-services",
    "serviceArea": "Greater Metro Area"
  },
  "services": {
    "terminology": "equipment"
  }
}
```

**Sample Services:**
```json
[
  {
    "id": 1,
    "name": "Large Bounce House",
    "category": "bounce-houses",
    "size": "15ft x 15ft",
    "price": 120,
    "description": "Perfect for bigger celebrations! Safe, clean, and guaranteed fun.",
    "features": ["Safety tested", "Professional setup", "All-day rental"]
  },
  {
    "id": 2,
    "name": "Party Package Complete",
    "category": "party-equipment",
    "size": "Full event setup",
    "price": 250,
    "description": "Everything needed for the perfect party - tables, chairs, decorations.",
    "features": ["Complete package", "Setup included", "Professional service"]
  }
]
```

**Environment Variables:**
```env
BUSINESS_NAME="Premier Party Rentals"
BUSINESS_EMAIL="bookings@premierparties.com"
BUSINESS_PHONE="+1 (555) PARTY-01"
```

---

## Equipment Rental (Construction, Tools)

Ideal for tool rental shops, construction equipment providers, and industrial equipment services.

### Configuration

**Business Configuration:**
```json
{
  "business": {
    "name": "ProTool Equipment Rental",
    "shortName": "ProTool",
    "description": "Professional-grade tools and equipment rental for contractors and DIY enthusiasts",
    "tagline": "Professional Tools, Professional Results",
    "industry": "equipment-rental",
    "serviceArea": "Regional Construction Zone"
  },
  "services": {
    "terminology": "equipment"
  }
}
```

**Sample Services:**
```json
[
  {
    "id": 1,
    "name": "Professional Drill Set",
    "category": "power-tools",
    "size": "Heavy-duty kit",
    "price": 35,
    "description": "Complete drill set with multiple bits, LED light, and carrying case.",
    "features": ["Professional grade", "Multiple attachments", "Safety certified"]
  },
  {
    "id": 2,
    "name": "Mini Excavator",
    "category": "construction",
    "size": "3-ton capacity",
    "price": 450,
    "description": "Compact excavator perfect for small to medium construction projects.",
    "features": ["Easy operation", "Fuel efficient", "Operator training included"]
  }
]
```

**Pricing Structure:**
- Daily rates for most equipment
- Weekly/monthly discounts
- Delivery and pickup fees
- Damage deposit requirements

---

## Appointment Booking (Professional Services)

Perfect for consultants, service providers, healthcare practices, and professional services.

### Configuration

**Business Configuration:**
```json
{
  "business": {
    "name": "Elite Business Consulting",
    "shortName": "Elite Consulting",
    "description": "Strategic business consulting and advisory services for growing companies",
    "tagline": "Strategic Guidance, Proven Results",
    "industry": "appointment-booking",
    "serviceArea": "Metropolitan Business District"
  },
  "services": {
    "terminology": "services"
  }
}
```

**Sample Services:**
```json
[
  {
    "id": 1,
    "name": "Initial Business Consultation",
    "category": "consultations",
    "size": "90 minutes",
    "price": 275,
    "description": "Comprehensive business assessment with strategic recommendations and action plan.",
    "features": ["Detailed analysis", "Custom strategy", "Follow-up included"]
  },
  {
    "id": 2,
    "name": "Strategy Follow-up Session",
    "category": "appointments",
    "size": "45 minutes",
    "price": 150,
    "description": "Progress review and strategy refinement based on implementation results.",
    "features": ["Progress tracking", "Strategy adjustment", "Implementation support"]
  }
]
```

**Booking Features:**
- Time-slot based booking
- Calendar integration
- Automated reminders
- Consultation notes and follow-up

---

## Venue Booking (Event Spaces)

Ideal for venues, event halls, meeting rooms, and facility rental businesses.

### Configuration

**Business Configuration:**
```json
{
  "business": {
    "name": "Grand Event Venues",
    "shortName": "Grand Venues",
    "description": "Elegant event spaces for weddings, corporate events, and special celebrations",
    "tagline": "Where Memories Are Made",
    "industry": "venue-booking",
    "serviceArea": "Downtown Events District"
  },
  "services": {
    "terminology": "venues"
  }
}
```

**Sample Services:**
```json
[
  {
    "id": 1,
    "name": "Grand Ballroom",
    "category": "wedding-venues",
    "size": "Seats 200 guests",
    "price": 2800,
    "description": "Elegant ballroom with crystal chandeliers, hardwood floors, and panoramic city views.",
    "features": ["Full catering kitchen", "AV equipment", "Bridal suite", "Valet parking"]
  },
  {
    "id": 2,
    "name": "Executive Conference Room",
    "category": "corporate-venues",
    "size": "Seats 50 people",
    "price": 650,
    "description": "Professional conference space with state-of-the-art technology and catering options.",
    "features": ["High-speed internet", "Video conferencing", "Catering available", "Parking included"]
  }
]
```

**Booking Features:**
- Full-day or half-day booking
- Package deals with catering
- Equipment and service add-ons
- Availability calendar

---

## Hybrid Business Models

### Event Planning + Venue Services

Combine event services with venue booking:

```json
{
  "business": {
    "industry": "event-services",
    "name": "Complete Event Solutions"
  },
  "services": {
    "categories": [
      {
        "id": "venues",
        "name": "Event Venues",
        "description": "Beautiful spaces for your event"
      },
      {
        "id": "equipment", 
        "name": "Party Equipment",
        "description": "Everything needed for your celebration"
      },
      {
        "id": "services",
        "name": "Event Services", 
        "description": "Professional event planning and coordination"
      }
    ]
  }
}
```

### Equipment Rental + Professional Services

Combine equipment rental with consultation:

```json
{
  "services": {
    "categories": [
      {
        "id": "equipment-rental",
        "name": "Equipment Rental",
        "description": "Professional tools and machinery"
      },
      {
        "id": "consultation",
        "name": "Technical Consultation", 
        "description": "Expert advice and training"
      }
    ]
  }
}
```

## Industry-Specific Features

### Event Services
- Delivery and setup scheduling
- Weather contingency planning
- Multi-day event booking
- Package discounts

### Equipment Rental
- Maintenance status tracking
- Training requirements
- Damage assessment
- Return condition checking

### Appointment Booking
- Time-based scheduling
- Recurring appointments
- Waitlist management
- Consultation notes

### Venue Booking
- Room capacity management
- Catering coordination
- AV equipment booking
- Event timeline planning

## SEO Optimization by Industry

### Event Services Keywords
```
"party equipment rental [city]"
"bounce house rental near me"  
"event equipment [area]"
"party supplies rental"
```

### Equipment Rental Keywords
```
"tool rental [city]"
"construction equipment rental"
"power tools for rent"
"[equipment type] rental near me"
```

### Professional Services Keywords
```
"[service type] consultant [city]"
"business consultation services"
"professional [service] provider"
"expert [field] advisor"
```

### Venue Rental Keywords
```
"wedding venues [city]"
"event space rental [area]"
"corporate meeting rooms"
"[venue type] for rent"
```

## Quick Setup Commands

Each industry type can be quickly configured:

```bash
# Event Services
npm run configure:event-services

# Equipment Rental  
npm run configure:equipment-rental

# Appointment Booking
npm run configure:appointment-booking

# Venue Booking
npm run configure:venue-booking
```

These commands update your configuration files with industry-appropriate defaults that you can then customize further.

## Support and Customization

Need help setting up for your specific industry? The template is highly flexible and can be adapted for:

- Photography services
- Catering companies  
- Cleaning services
- Fitness and wellness
- Education and training
- And many more!

Contact support or refer to the configuration guide for advanced customization options.