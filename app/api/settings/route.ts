import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'global' },
    });
    return NextResponse.json(settings || {});
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({});
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data = {
      whatsappNumber: body.whatsappNumber,
      brandName: body.brandName,
      logoImageUrl: body.logoImageUrl,
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroImageUrl: body.heroImageUrl,
      heroBgImageUrl: body.heroBgImageUrl,
      aboutTitle: body.aboutTitle,
      aboutText: body.aboutText,
      aboutImageUrl: body.aboutImageUrl,
      aboutStats: typeof body.aboutStats === 'string' ? body.aboutStats : JSON.stringify(body.aboutStats || []),
      aboutImageSize: body.aboutImageSize ? parseInt(body.aboutImageSize) : 400,
      heroImageSize: body.heroImageSize ? parseInt(body.heroImageSize) : 400,
      whyTitle: body.whyTitle,
      whySubtitle: body.whySubtitle,
      whyCards: typeof body.whyCards === 'string' ? body.whyCards : JSON.stringify(body.whyCards || []),
      certTitle: body.certTitle,
      certSubtitle: body.certSubtitle,
      certCards: typeof body.certCards === 'string' ? body.certCards : JSON.stringify(body.certCards || []),
      testiTitle: body.testiTitle,
      testimonials: typeof body.testimonials === 'string' ? body.testimonials : JSON.stringify(body.testimonials || []),
      contactEmail: body.contactEmail,
      footerAboutText: body.footerAboutText,
      facebookUrl: body.facebookUrl,
      instagramUrl: body.instagramUrl,
      tiktokUrl: body.tiktokUrl,
      siteTitle: body.siteTitle,
      faviconUrl: body.faviconUrl,
      logoHeight: body.logoHeight ? parseInt(body.logoHeight) : 40,
      showCatalog: body.showCatalog === true || body.showCatalog === 'true',
      showAbout: body.showAbout === true || body.showAbout === 'true',
      showValues: body.showValues === true || body.showValues === 'true',
      showCertifications: body.showCertifications === true || body.showCertifications === 'true',
      showTestimonials: body.showTestimonials === true || body.showTestimonials === 'true',
      showContact: body.showContact === true || body.showContact === 'true',
    };

    const updatedSettings = await prisma.siteSettings.upsert({
      where: { id: 'global' },
      update: data,
      create: {
        ...data,
        id: 'global',
      },
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Settings UPDATE Error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
