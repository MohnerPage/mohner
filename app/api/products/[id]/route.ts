import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = parseInt(resolvedParams.id, 10);
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  
  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== 'admin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const resolvedParams = await Promise.resolve(params);
    const id = parseInt(resolvedParams.id, 10);
    const body = await req.json();

    const {
      name,
      description,
      material,
      capacity,
      height,
      diameter,
      thread,
      colors,
      category,
      price,
      imageUrl,
      galleryUrls,
    } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description: description ?? '',
        material: material ?? '',
        capacity: capacity ?? '',
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

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
