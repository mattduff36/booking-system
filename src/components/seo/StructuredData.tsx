import { getBusinessConfig } from '@/lib/config/business-config';

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Product' | 'Service' | 'BreadcrumbList';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Local Business structured data for the main site
export function LocalBusinessStructuredData() {
  const config = getBusinessConfig();
  
  const localBusinessData = {
    name: config.business.name,
    description: config.business.description,
    '@type': 'LocalBusiness',
    '@context': 'https://schema.org',
    url: config.business.website,
    logo: `${config.business.website}${config.branding.logoPath}`,
    image: [
      `${config.business.website}${config.seo.ogImage}`,
      `${config.business.website}/service-image-1.jpg`,
      `${config.business.website}/service-image-2.jpg`
    ],
    telephone: config.business.contact.phone,
    email: config.business.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.business.contact.address.street,
      addressLocality: config.business.contact.address.city,
      addressRegion: config.business.contact.address.state,
      postalCode: config.business.contact.address.zip,
      addressCountry: config.business.contact.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7128, // Default coordinates - to be configured per business
      longitude: -74.0060
    },
    openingHours: [
      'Mo-Fr 09:00-18:00',
      'Sa 09:00-17:00',
      'Su 10:00-16:00'
    ],
    areaServed: [
      {
        '@type': 'City',
        name: config.business.contact.address.city
      },
      {
        '@type': 'State',
        name: config.business.contact.address.state
      }
    ],
    serviceType: config.services.terminology === 'equipment' ? 'Equipment Rental' : 
                 config.services.terminology === 'venues' ? 'Venue Rental' : 'Professional Services',
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${config.business.name} Services`,
      itemListElement: config.services.categories.map(category => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service', 
          name: category.name,
          description: category.description
        }
      }))
    },
    sameAs: [
      // Social media links to be configured per business
    ]
  };

  return <StructuredData type="LocalBusiness" data={localBusinessData} />;
}

// Breadcrumb structured data
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbData = {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return <StructuredData type="BreadcrumbList" data={breadcrumbData} />;
}