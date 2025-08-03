import { NextResponse } from 'next/server';
import { getBusinessConfig } from '@/lib/config/business-config';

export async function GET() {
  try {
    const config = getBusinessConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error loading business config:', error);
    return NextResponse.json(
      { error: 'Failed to load business configuration' },
      { status: 500 }
    );
  }
}