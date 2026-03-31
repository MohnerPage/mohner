import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  // Verificar autenticación admin
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== 'admin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();

    const {
      name,
      description,
      material,
      capacity,
      dimensions,
      category,
      price,
      imageUrl,
      height,
      diameter,
      thread,
      colors,
      galleryUrls,
    } = body;

    if (!name || !category || price === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: name, category, price' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description ?? '',
        material: material ?? '',
        capacity: capacity ?? '',
        dimensions: dimensions ?? '',
        height: height ?? null,
        diameter: diameter ?? null,
        thread: thread ?? null,
        colors: colors ?? null,
        category,
        price: parseFloat(price),
        imageUrl: imageUrl ?? null,
        galleryUrls: galleryUrls ? JSON.stringify(galleryUrls) : null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: 'Error interno del servidor', details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined },
      { status: 500 }
    );
  }
}
