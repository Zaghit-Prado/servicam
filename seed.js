const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Crear prestadores
  const p1 = await prisma.user.create({
    data: {
      email: 'carpintero@ejemplo.com',
      name: 'Carlos Mendoza',
      role: 'PROVIDER',
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&q=80',
      skills: {
        create: [{ name: 'Carpintería' }]
      }
    }
  });

  const p2 = await prisma.user.create({
    data: {
      email: 'electricista@ejemplo.com',
      name: 'Luis Ramírez',
      role: 'PROVIDER',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80',
      skills: {
        create: [{ name: 'Electricidad' }]
      }
    }
  });

  const p3 = await prisma.user.create({
    data: {
      email: 'gasfitero@ejemplo.com',
      name: 'Roberto Torres',
      role: 'PROVIDER',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80',
      skills: {
        create: [{ name: 'Gasfitería' }]
      }
    }
  });

  // Crear algunos trabajos
  await prisma.serviceRequest.createMany({
    data: [
      {
        title: 'Reparación de tubería rota',
        description: 'Tubería goteando bajo el lavadero de la cocina. Necesito ayuda urgente.',
        category: 'Gasfitería',
        minPrice: 50,
        maxPrice: 100,
        clientId: p1.id,
        latitude: -12.046,
        longitude: -77.042,
        images: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80'
      },
      {
        title: 'Instalación de tomacorrientes',
        description: 'Necesito instalar 3 tomacorrientes nuevos en la sala.',
        category: 'Electricidad',
        minPrice: 80,
        maxPrice: 120,
        clientId: p2.id,
        latitude: -12.048,
        longitude: -77.045,
        images: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600&q=80'
      },
      {
        title: 'Armado de ropero 4 puertas',
        description: 'Acabo de comprar un ropero de melamina y necesito alguien con experiencia para armarlo.',
        category: 'Carpintería',
        minPrice: 100,
        maxPrice: 150,
        clientId: p3.id,
        latitude: -12.050,
        longitude: -77.040,
        images: 'https://images.unsplash.com/photo-1595514535415-38c201c1075c?w=600&q=80'
      }
    ]
  });
  console.log('Seed terminado');
}

main().catch(console.error).finally(() => prisma.$disconnect());
