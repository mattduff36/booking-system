# Task List: Booking System Template

Based on PRD: `prd-booking-system-template.md`

## Relevant Files

- `config/business.json` - Central configuration file for business details, branding, and industry settings
- `config/industry-presets.json` - Industry-specific configuration presets and terminology
- `src/lib/config/business-config.ts` - TypeScript interfaces and configuration loader
- `src/lib/config/business-config.test.ts` - Unit tests for business configuration
- `src/components/sections/ServiceCard.tsx` - Generalized service/product card component (renamed from CastleCard)
- `src/components/sections/ServiceCard.test.tsx` - Unit tests for ServiceCard component
- `src/components/sections/ServiceHighlights.tsx` - Generalized service highlights (renamed from CastleHighlights)
- `src/app/admin/services/page.tsx` - Admin services management page (renamed from fleet)
- `src/app/services/page.tsx` - Public services page (renamed from castles)
- `src/lib/database/services.ts` - Database operations for services (renamed from castles)
- `src/lib/database/services.test.ts` - Unit tests for services database operations
- `data/services.json` - Generic service/product data (replaces castles.json)
- `data/sample-data/` - Directory containing industry-specific sample data sets
- `src/lib/utils/content-sanitizer.ts` - Utility functions for removing client-specific content
- `src/lib/utils/content-sanitizer.test.ts` - Unit tests for content sanitizer
- `docs/setup-guide.md` - Comprehensive setup and deployment guide
- `docs/configuration-guide.md` - Configuration options and customization guide
- `docs/industry-examples.md` - Industry-specific setup examples
- `scripts/sanitize-data.js` - Script to remove T&S specific data and replace with placeholders
- `scripts/setup-template.js` - Automated template setup script
- `.env.template` - Template environment variables file
- `README-TEMPLATE.md` - Template-specific README with setup instructions

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- The sanitization script should be run before deploying the template
- Industry presets can be extended by adding new configurations to the presets file

## Tasks

- [ ] 1.0 Data Sanitization & Content Removal
  - [ ] 1.1 Remove all "T&S Bouncy Castle Hire" references from text content, meta tags, and configuration files
  - [ ] 1.2 Clear actual customer booking data from database and replace with anonymized sample data
  - [ ] 1.3 Remove hardcoded contact information, addresses, and business-specific details from all components
  - [ ] 1.4 Replace specific service images (bouncy castles) with generic placeholder images
  - [ ] 1.5 Create content sanitization utility script to automate data cleaning process
  - [ ] 1.6 Update all hardcoded business references in email templates and notifications
  - [ ] 1.7 Remove or anonymize any API keys, credentials, or environment-specific configurations

- [ ] 2.0 Configuration System Implementation
  - [ ] 2.1 Create central `config/business.json` file with configurable business profile fields
  - [ ] 2.2 Implement `config/industry-presets.json` with presets for events, rentals, appointments, venues
  - [ ] 2.3 Develop TypeScript interfaces and configuration loader in `src/lib/config/business-config.ts`
  - [ ] 2.4 Create configuration validation system to ensure required fields are provided
  - [ ] 2.5 Implement dynamic terminology system (Fleet/Services/Inventory/Products) based on business type
  - [ ] 2.6 Add theme and styling configuration options for colors, fonts, and branding
  - [ ] 2.7 Create environment variable template (.env.template) with all required configurations
  - [ ] 2.8 Implement configuration hot-reloading for development environment

- [ ] 3.0 Content Generalization & Multi-Industry Support
  - [ ] 3.1 Rename and refactor "Fleet" pages to configurable "Services" pages throughout the application
  - [ ] 3.2 Convert `CastleCard` component to generic `ServiceCard` with configurable attributes
  - [ ] 3.3 Update `CastleHighlights` to `ServiceHighlights` with industry-agnostic content
  - [ ] 3.4 Create generic service/product data structure replacing castle-specific schema
  - [ ] 3.5 Generate sample data sets for different industries (events, equipment rental, appointments, venues)
  - [ ] 3.6 Implement configurable service categories and attributes system
  - [ ] 3.7 Update all API endpoints to use generic terminology (services instead of castles)
  - [ ] 3.8 Create industry-specific booking form field configurations
  - [ ] 3.9 Update database schema to support generic service/product attributes

- [ ] 4.0 Template Structure & Component Standardization
  - [ ] 4.1 Update all component imports and references to use generic naming conventions
  - [ ] 4.2 Ensure all UI components accept configuration props for customization
  - [ ] 4.3 Standardize API response formats and error handling across all endpoints
  - [ ] 4.4 Update routing structure to support configurable page names and URLs
  - [ ] 4.5 Implement generic email template system with configurable content placeholders
  - [ ] 4.6 Ensure all database operations work with generic service/product data
  - [ ] 4.7 Update authentication and authorization to work with configurable business contexts
  - [ ] 4.8 Test all booking workflows with different industry configurations
  - [ ] 4.9 Validate responsive design works across all template variations

- [ ] 5.0 Documentation & Setup Guide Creation
  - [ ] 5.1 Create comprehensive setup guide with beginner, intermediate, and advanced tracks
  - [ ] 5.2 Document all configuration options with examples and default values
  - [ ] 5.3 Create industry-specific setup examples for events, rentals, appointments, and venues
  - [ ] 5.4 Write troubleshooting guide for common setup and deployment issues
  - [ ] 5.5 Document all customization points and extension mechanisms
  - [ ] 5.6 Create automated setup script for quick template deployment
  - [ ] 5.7 Write README-TEMPLATE.md with clear installation and configuration instructions
  - [ ] 5.8 Document database setup and migration procedures
  - [ ] 5.9 Create video or visual guides for non-technical users
  - [ ] 5.10 Document licensing terms and usage guidelines for agencies