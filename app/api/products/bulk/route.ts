import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Formato inválido. Se esperaba un array de productos.' }, { status: 400 });
    }

    // Utilizar una transacción para que si falla uno, fallen todos y no haya datos corruptos 
    // O iterar para insertarlos asegurándose de omitir fallos. Para mayor flexibilidad,
    // usaremos iteración con catch por cada uno para no detener la inserción masiva por un error de formato.
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (const item of body) {
      try {
        if (!item.name) throw new Error('El producto no tiene nombre (name).');

        // Normalizamos los datos desde el JSON del Excel
        const priceNum = parseFloat(item.price);
        
        const data = {
          name: item.name,
          category: item.category || 'Sin Categoría',
          price: isNaN(priceNum) ? 0 : priceNum,
          description: item.description || '',
          material: item.material || '',
          capacity: item.capacity || '',
          dimensions: item.dimensions || '',
          height: item.height || null,
          diameter: item.diameter || null,
          thread: item.thread || null,
          colors: item.colors || null,
          imageUrl: item.imageUrl || null,
          galleryUrls: item.galleryUrls || null,
        };

        // Si se provee ID, intentamos actualizarlo
        if (item.id) {
          const idNum = parseInt(item.id, 10);
          if (!isNaN(idNum)) {
            const existing = await prisma.product.findUnique({ where: { id: idNum } });
            if (existing) {
              await prisma.product.update({
                where: { id: idNum },
                data
              });
              successCount++;
              continue; // Pasamos al siguiente
            }
          }
        }

        // Si no tiene ID o no lo encontró, lo creamos nuevo
        await prisma.product.create({
          data
        });
        
        successCount++;
      } catch (err: any) {
        errorCount++;
        errors.push({ item: item.name || 'Desconocido', error: err.message });
      }
    }

    return NextResponse.json({
      message: `Importación finalizada. ${successCount} actualizados/creados, ${errorCount} errores.`,
      successCount,
      errorCount,
      errors
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error in bulk import:', error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor.' }, { status: 500 });
  }
}
