import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Borrando datos anteriores...")
  await prisma.review.deleteMany()
  await prisma.serviceRequest.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.user.deleteMany()

  console.log("Creando habilidades...")
  const gasfiteria = await prisma.skill.create({ data: { name: "Gasfitería" } })
  const electricidad = await prisma.skill.create({ data: { name: "Electricidad" } })
  const carpinteria = await prisma.skill.create({ data: { name: "Carpintería" } })
  const pintura = await prisma.skill.create({ data: { name: "Pintura" } })

  console.log("Creando usuarios (Prestadores y Clientes)...")
  
  // PRESTADORES
  const carlos = await prisma.user.create({
    data: {
      name: "Carlos Mendoza",
      email: "carlos@example.com",
      role: "PROVIDER",
      image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=256&h=256&q=80",
      skills: { connect: [{ id: gasfiteria.id }, { id: carpinteria.id }] }
    }
  })

  const ana = await prisma.user.create({
    data: {
      name: "Ana Suárez",
      email: "ana@example.com",
      role: "PROVIDER",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80",
      skills: { connect: [{ id: electricidad.id }] }
    }
  })

  // CLIENTES
  const luis = await prisma.user.create({
    data: {
      name: "Luis Pérez",
      email: "luis@example.com",
      role: "CLIENT",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80"
    }
  })

  console.log("Creando solicitudes de servicio...")
  
  await prisma.serviceRequest.create({
    data: {
      title: "Reparación de tubería en cocina",
      description: "Fuga de agua constante debajo del lavadero.",
      category: "Gasfitería",
      minPrice: 80,
      maxPrice: 120,
      urgency: "URGENTE",
      status: "PUBLISHED",
      latitude: -12.051,
      longitude: -77.048,
      images: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80",
      clientId: luis.id
    }
  })

  await prisma.serviceRequest.create({
    data: {
      title: "Instalación de focos LED en sala",
      description: "Cambiar 6 dicroicos por paneles LED nuevos.",
      category: "Electricidad",
      minPrice: 50,
      maxPrice: 80,
      status: "PUBLISHED",
      latitude: -12.042,
      longitude: -77.038,
      images: "https://images.unsplash.com/photo-1557124816-e9b7d5440de2?auto=format&fit=crop&w=600&q=80",
      clientId: luis.id
    }
  })

  await prisma.serviceRequest.create({
    data: {
      title: "Armado de ropero 4 puertas",
      description: "Acabo de comprar un ropero de melamina y necesito alguien con experiencia para armarlo.",
      category: "Carpintería",
      minPrice: 100,
      maxPrice: 150,
      status: "PUBLISHED",
      latitude: -12.06,
      longitude: -77.03,
      images: "https://images.unsplash.com/photo-1540574163026-643ea20d25b5?auto=format&fit=crop&w=600&q=80",
      clientId: luis.id
    }
  })

  console.log("¡Base de datos sembrada con éxito!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
