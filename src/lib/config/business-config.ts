import fs from 'fs';
import path from 'path';

export interface BusinessContact {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface BusinessInfo {
  name: string;
  shortName: string;
  description: string;
  tagline: string;
  industry: string;
  contact: BusinessContact;
  serviceArea: string;
  website: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

export interface ServicesConfig {
  terminology: string;
  pageTitle?: string;
  categories: ServiceCategory[];
}

export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoPath: string;
  faviconPath: string;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
}

export interface FeaturesConfig {
  bookingSystem: boolean;
  onlinePayments: boolean;
  calendarIntegration: boolean;
  emailNotifications: boolean;
  adminPanel: boolean;
}

export interface BusinessConfig {
  business: BusinessInfo;
  services: ServicesConfig;
  branding: BrandingConfig;
  seo: SEOConfig;
  features: FeaturesConfig;
}

export interface IndustryPreset {
  business: Partial<BusinessInfo>;
  services: Partial<ServicesConfig>;
  seo: Partial<SEOConfig>;
}

export interface IndustryPresets {
  presets: {
    [key: string]: IndustryPreset;
  };
}

let cachedConfig: BusinessConfig | null = null;
let cachedPresets: IndustryPresets | null = null;

export function getBusinessConfig(): BusinessConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const configPath = path.join(process.cwd(), 'config', 'business.json');
    const configFile = fs.readFileSync(configPath, 'utf8');
    cachedConfig = JSON.parse(configFile) as BusinessConfig;
    return cachedConfig;
  } catch (error) {
    console.error('Error loading business configuration:', error);
    throw new Error('Failed to load business configuration. Please ensure config/business.json exists and is valid.');
  }
}

export function getIndustryPresets(): IndustryPresets {
  if (cachedPresets) {
    return cachedPresets;
  }

  try {
    const presetsPath = path.join(process.cwd(), 'config', 'industry-presets.json');
    const presetsFile = fs.readFileSync(presetsPath, 'utf8');
    cachedPresets = JSON.parse(presetsFile) as IndustryPresets;
    return cachedPresets;
  } catch (error) {
    console.error('Error loading industry presets:', error);
    throw new Error('Failed to load industry presets. Please ensure config/industry-presets.json exists and is valid.');
  }
}

export function applyIndustryPreset(industry: string): BusinessConfig {
  const baseConfig = getBusinessConfig();
  const presets = getIndustryPresets();
  
  const preset = presets.presets[industry];
  if (!preset) {
    console.warn(`Industry preset '${industry}' not found. Using base configuration.`);
    return baseConfig;
  }

  // Deep merge preset with base config
  const mergedConfig: BusinessConfig = {
    business: { ...baseConfig.business, ...preset.business },
    services: { ...baseConfig.services, ...preset.services },
    branding: baseConfig.branding,
    seo: { ...baseConfig.seo, ...preset.seo },
    features: baseConfig.features
  };

  return mergedConfig;
}

export function validateBusinessConfig(config: BusinessConfig): boolean {
  const requiredBusinessFields = ['name', 'shortName', 'description', 'industry'];
  const requiredContactFields = ['phone', 'email'];
  
  for (const field of requiredBusinessFields) {
    if (!config.business[field as keyof BusinessInfo]) {
      console.error(`Missing required business field: ${field}`);
      return false;
    }
  }

  for (const field of requiredContactFields) {
    if (!config.business.contact[field as keyof BusinessContact]) {
      console.error(`Missing required contact field: ${field}`);
      return false;
    }
  }

  if (!config.services.terminology) {
    console.error('Missing required services terminology');
    return false;
  }

  return true;
}

// Utility function to get configuration value with fallback
export function getConfigValue<T>(
  config: BusinessConfig,
  path: string,
  fallback: T
): T {
  const keys = path.split('.');
  let current: any = config;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return fallback;
    }
  }
  
  return current !== undefined ? current : fallback;
}

// Environment variable integration
export function getConfigFromEnv(): Partial<BusinessConfig> {
  return {
    business: {
      name: process.env.BUSINESS_NAME || '',
      shortName: process.env.BUSINESS_SHORT_NAME || '',
      description: process.env.BUSINESS_DESCRIPTION || '',
      tagline: process.env.BUSINESS_TAGLINE || '',
      industry: process.env.BUSINESS_INDUSTRY || 'event-services',
      contact: {
        phone: process.env.BUSINESS_PHONE || '',
        email: process.env.BUSINESS_EMAIL || '',
        address: {
          street: process.env.BUSINESS_ADDRESS_STREET || '',
          city: process.env.BUSINESS_ADDRESS_CITY || '',
          state: process.env.BUSINESS_ADDRESS_STATE || '',
          zip: process.env.BUSINESS_ADDRESS_ZIP || '',
          country: process.env.BUSINESS_ADDRESS_COUNTRY || ''
        }
      },
      serviceArea: process.env.BUSINESS_SERVICE_AREA || '',
      website: process.env.BUSINESS_WEBSITE || ''
    }
  } as Partial<BusinessConfig>;
}