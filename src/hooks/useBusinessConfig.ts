"use client";

import { useState, useEffect } from 'react';
import type { BusinessConfig } from '@/lib/config/business-config';

// Default/fallback configuration for when the API fails or is loading
const DEFAULT_CONFIG: BusinessConfig = {
  business: {
    name: "Your Business Name",
    shortName: "YBN",
    description: "Professional service provider offering quality solutions for your needs",
    tagline: "Quality Service You Can Trust",
    industry: "services",
    contact: {
      phone: "(555) 123-4567",
      email: "info@yourbusiness.com",
      address: {
        street: "123 Business St",
        city: "Your City",
        state: "ST",
        zip: "12345",
        country: "USA"
      }
    },
    serviceArea: "Local Area",
    website: "https://yourbusiness.com"
  },
  services: {
    terminology: "services",
    categories: [
      {
        id: "general",
        name: "General Services",
        description: "Our standard service offerings"
      }
    ]
  },
  branding: {
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    logoPath: "/logo.png"
  },
  seo: {
    metaTitle: "Your Business Name - Professional Services",
    metaDescription: "Professional service provider offering quality solutions for your needs",
    keywords: ["services", "professional", "local business"],
    ogImage: "/og-image.jpg"
  }
};

export function useBusinessConfig() {
  const [config, setConfig] = useState<BusinessConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error(`Failed to fetch config: ${response.status}`);
        }
        const configData = await response.json();
        setConfig(configData);
        setError(null);
      } catch (err) {
        console.error('Error fetching business config:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Keep using default config on error
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
}