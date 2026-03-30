const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const initialProducts = [
  {
    name: 'Nordic Clear Flint 750ml',
    description: 'Vidrio de alta claridad con base pesada diseñado para licores de alta gama y boutiques.',
    material: 'Vidrio',
    capacity: '750',
    dimensions: '30 x 10',
    category: 'Destilados Premium',
    price: 5.12,
    imageUrl: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'HDPE Almacenamiento Químico 1L',
    description: 'Polietileno de alta densidad opaco con sello de inducción para almacenamiento seguro de químicos industriales.',
    material: 'Plástico',
    capacity: '1000',
    dimensions: '25 x 12',
    category: 'Industrial',
    price: 0.95,
    imageUrl: '/prod_industrial_v2.png',
  },
  {
    name: 'Tapa de Aluminio Anodizado 28mm',
    description: 'Cierres de aluminio reciclables y eco-amigables con liners EPE para bebidas carbonatadas.',
    material: 'Aluminio',
    capacity: '0',
    dimensions: '2.8 x 1',
    category: 'Cierres',
    price: 0.12,
    imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Frasco Cuadrado para Conservas 250g',
    description: 'Frasco de vidrio de boca ancha perfecto para conservas gourmet, miel y sales de especialidad.',
    material: 'Vidrio',
    capacity: '250',
    dimensions: '10 x 10',
    category: 'Grado Alimenticio',
    price: 1.15,
    imageUrl: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Botella Cosmética PET 100ml',
    description: 'PET transparente con dispensador de acabado mate suave, ideal para lociones y sueros.',
    material: 'Plástico',
    capacity: '100',
    dimensions: '12 x 5',
    category: 'Cosméticos',
    price: 0.68,
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vial Pharma de Vidrio Ámbar 30ml',
    description: 'Viales de vidrio borosilicato Tipo III con sellos de seguridad para productos estériles.',
    material: 'Vidrio',
    capacity: '30',
    dimensions: '5 x 2',
    category: 'Farmacéutica',
    price: 0.92,
    imageUrl: '/prod_pharma_v2.png',
  },
];

async function main() {
  console.log('Seeding products...');
  for (const product of initialProducts) {
    await prisma.product.create({
      data: product,
    });
  }
  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
