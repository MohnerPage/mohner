import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No se proporcionaron IDs válidos' }, { status: 400 });
    }

    // Convertir IDs a números si es necesario (Prisma suele usar números para IDs autoincrementales)
    const numericIds = ids.map(id => Number(id));

    const result = await (prisma as any).product.deleteMany({
      where: {
        id: {
          in: numericIds
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      count: result.count,
      message: `Se eliminaron ${result.count} productos correctamente.` 
    });
  } catch (error: any) {
    console.error('Bulk delete error:', error);
    return NextResponse.json({ error: 'Error al eliminar los productos' }, { status: 500 });
  }
}
