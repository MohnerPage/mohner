import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Crear usuario admin si no existe
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@crystalline.corp' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@crystalline.corp',
        password: hashedPassword,
        name: 'Admin Crystalline',
        role: 'admin',
      },
    });
    console.log('✅ Usuario admin creado: admin@crystalline.corp / admin123');
  }

  // Crear configuración global por defecto
  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      whatsappNumber: '5213312345678',
      heroTitle: 'Excelencia en Envases de Vidrio y Plástico',
      heroSubtitle: 'Calidad duradera para productos extraordinarios',
      aboutText: 'En Crystalline transformamos materias primas en obras de arte funcionales. Más de 25 años liderando la industria de envases de vidrio y plástico en México, con un enfoque en innovación, calidad certificada y responsabilidad ambiental.\n\nCada envase que sale de nuestras plantas pasa por un control de calidad de 12 etapas. Invertimos constantemente en tecnología de manufactura y procesos eco-amigables, porque creemos que la excelencia y la sostenibilidad van de la mano.',
      contactEmail: 'contacto@crystalline.com',
    },
  });
  console.log('✅ Configuraciones globales (SiteSettings) inicializadas');

  // Crear productos de ejemplo si no existen
  const count = await prisma.product.count();
  if (count === 0) {
    const products = [
      {
        name: 'Nordic Clear Flint 750ml',
        description: 'Extra-clear heavy flint glass with a weighted base designed for high-end boutique spirits.',
        material: 'glass',
        capacity: '750',
        dimensions: '8.5 x 30 x 8.5',
        height: '30.0 cm',
        diameter: '8.5 cm',
        thread: 'Corcho 22.5mm',
        colors: 'Super Flint (Cristalino)',
        category: 'Premium Spirit',
        price: 5.12,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsgN4XwvqD5u9djRd6tpQoZFKVFQx8dhXUEbIYIozxHnhPNqaCY6i9yyUUXaXpCDRgZqUEVSPuTLNaaQCknkbVgP975S-nGudoBypxo5M0G2O_2Ow2tXFcPcJzYzAAebGlTiQkN829uogrkzCmAi3JuJJpggTC_bISF__FuPWXGePER_-21t078a9f-kOQU7O_Sff8mKbvpzDK-EVfD0FzADxq4ZzXHJFTSNEBK6MWbJg1-QOZSx25LgZn8s8_eB8UhrR9bSVCcz2Y',
      },
      {
        name: 'HDPE Chemical Storage 1L',
        description: 'Opaque high-density polyethylene with induction seal cap for safe industrial chemical storage.',
        material: 'plastic',
        capacity: '1000',
        dimensions: '12 x 22 x 12',
        height: '22.0 cm',
        diameter: '12.0 cm',
        thread: 'Rosca 28/410',
        colors: 'Blanco Opaco, Natural',
        category: 'Industrial',
        price: 0.95,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgUBdLgRlyhfGKhNSmlOe_L0biys5QslYastyaWT8KJQpKT0JN7SLsuKJm2Zyy_9XhQiSlQxMZtSdL1B5zLybqraoS-u-4sJDw_iKrVYZCdj27TOO8IJVXiQacLUQeo_mjTzHmCHw_vE81Q118UIhk2mEdhr1FEk9Qmiid9Yk-O5x7HQOE_aEsBToyg4YCElLcCWg18pfyr8Bvp9LF7UVzIigaCBJiK_kStecxoRZpw455JIAQI2F9r0c87VYmr06kj1oBXFHyBuVP',
      },
      {
        name: 'Anodized Aluminum Cap 28mm',
        description: 'Eco-friendly recyclable aluminum closures with EPE liners for carbonated beverages.',
        material: 'other',
        capacity: '',
        dimensions: '28mm',
        height: '1.5 cm',
        diameter: '2.8 cm',
        thread: '28mm Standard',
        colors: 'Plata, Oro, Negro Mate',
        category: 'Closures',
        price: 0.12,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYXHcWHnFw1UduLhrtxZJXScrag0e3qi5eKQ3Taoeg3uIfKQiSTzqgw4CbyJud3XPl_75Z6Xuh-7YXjcdfQilfrRtbwwho-xXc3ypWbH2RIwRZxG6TV6B81Vp1h7TZ_kt7jMLLcTcKBL3rJZcnwpFHZ-q2aNe2cvLHlolog5mfnUPuGaBEIYXUtJyw2x-N9StqTOQw53HwBmAUmMqshowFHm5_T-cU66ZzlufDv0E_HBhUhCwAQz8jUwaiAT-afa7QPy5WrexW_FRd',
      },
      {
        name: 'Square Glass Preserve 250g',
        description: 'Wide-mouth soda lime glass jar perfect for gourmet preserves, honey, and specialty salts.',
        material: 'glass',
        capacity: '250',
        dimensions: '8 x 8 x 10',
        height: '10.0 cm',
        diameter: '8.0 cm base',
        thread: 'Twist-Off 63mm',
        colors: 'Transparente',
        category: 'Food Grade',
        price: 1.15,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-SATHJGX0rBRDdDHOE78xaqFL4EnkTw6Dqq2biuL8XoCc_hEwKXCgbIbfn4POYvP_4-QVpqezg6uxBTnHG3E3fPA853TSUnRw5HP-dB4qVatnSzvve31jWPYnURMgzgOA0CExzjQMXUuV1pBLZQoLiZotz77AWwr-Qqru3MfpUI5bB94KKXC7y-LolTAMKDyQhj_LbmmnXo021bJMjFHIXVN2riFyxkaNW7zAAU1ZxRxyz69ng1xSEk66gZs3d4i587TIW2cfkRXt',
      },
    ];

    for (const p of products) {
      await prisma.product.create({ data: p });
    }
    console.log('✅ 4 productos de ejemplo creados');
  }

  console.log('✅ Seed completado');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
