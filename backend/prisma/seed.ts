import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.item.deleteMany()
  await prisma.user.deleteMany()

  console.log('📝 Creating test users...')

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@ecoswap.com',
      passwordHash: await bcrypt.hash('admin123', 10),
      phone: '+34 600 000 000',
      location: 'Madrid, España',
      role: 'admin'
    }
  })

  // Create test users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Carlos García',
        email: 'carlos@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phone: '+34 612 345 678',
        location: 'Madrid, España'
      }
    }),
    prisma.user.create({
      data: {
        name: 'María López',
        email: 'maria@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phone: '+34 623 456 789',
        location: 'Barcelona, España'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Javier Martínez',
        email: 'javier@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phone: '+34 634 567 890',
        location: 'Valencia, España'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Ana Rodríguez',
        email: 'ana@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phone: '+34 645 678 901',
        location: 'Sevilla, España'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Pablo Sánchez',
        email: 'pablo@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        phone: '+34 656 789 012',
        location: 'Bilbao, España'
      }
    })
  ])

  console.log(`✅ Created ${users.length} test users`)
  console.log(`✅ Created admin user`)
  console.log('📦 Creating mock items...')

  // Create mock items
  const items = [
    // Carlos's items (Madrid)
    {
      userId: users[0].id,
      title: 'Mesa de Centro Vintage',
      description: 'Preciosa mesa de centro de estilo mid-century en excelente estado. Construcción de roble macizo con acabado nogal. Perfecta para cualquier salón. Dimensiones: 120cm L x 60cm A x 45cm H. Pequeño desgaste en los bordes que le da carácter.',
      category: 'Furniture',
      condition: 'Good',
      isFree: false,
      price: 150,
      location: 'Madrid, España',
      imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800'
    },
    {
      userId: users[0].id,
      title: 'Colección Libros Infantiles (20+ libros)',
      description: 'Colección de libros infantiles para edades 4-8. Incluye clásicos como El Monstruo de Colores, La Oruga Glotona y más. Todos los libros están en buen estado de lectura.',
      category: 'Books',
      condition: 'Good',
      isFree: true,
      price: null,
      location: 'Madrid, España',
      imageUrl: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800'
    },
    {
      userId: users[0].id,
      title: 'Esterilla y Bloques de Yoga',
      description: 'Esterilla de yoga premium (6mm de grosor) con dos bloques de corcho. La esterilla es morada con buen agarre. Limpia y desinfectada. Perfecta para práctica en casa o clases.',
      category: 'Sports',
      condition: 'Like New',
      isFree: false,
      price: 35,
      location: 'Madrid, España',
      imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800'
    },

    // María's items (Barcelona)
    {
      userId: users[1].id,
      title: 'Monitor Dell 24"',
      description: 'Monitor Dell UltraSharp U2415 de 24 pulgadas. Resolución 1920x1200, panel IPS con excelente precisión de color. Incluye cable de alimentación y cable HDMI. Ideal para teletrabajo o gaming.',
      category: 'Electronics',
      condition: 'Good',
      isFree: false,
      price: 120,
      location: 'Barcelona, España',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800'
    },
    {
      userId: users[1].id,
      title: 'Abrigo de Invierno - Talla L',
      description: 'Chaqueta de invierno Columbia, talla L. Negra, exterior impermeable con aislamiento cálido. Apenas usada, me mudo a clima más cálido. Precio original 200€.',
      category: 'Clothing',
      condition: 'Like New',
      isFree: false,
      price: 80,
      location: 'Barcelona, España',
      imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800'
    },
    {
      userId: users[1].id,
      title: 'Planta Lengua de Suegra en Maceta',
      description: 'Planta sana de lengua de suegra (Sansevieria) en maceta de cerámica. Excelente planta purificadora de aire, muy bajo mantenimiento. Aproximadamente 60cm de altura. Solo recogida.',
      category: 'Home & Garden',
      condition: 'New',
      isFree: true,
      price: null,
      location: 'Barcelona, España',
      imageUrl: 'https://images.unsplash.com/photo-1593482892540-73c9199dbe99?w=800'
    },

    // Javier's items (Valencia)
    {
      userId: users[2].id,
      title: 'Guitarra Acústica',
      description: 'Guitarra acústica Yamaha FG800. Excelente para principiantes e intermedios. Viene con funda blanda, afinador y cuerdas extra. Algunos arañazos menores pero suena genial.',
      category: 'Other',
      condition: 'Good',
      isFree: false,
      price: 180,
      location: 'Valencia, España',
      imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800'
    },
    {
      userId: users[2].id,
      title: 'Convertidor Escritorio de Pie',
      description: 'Convertidor de escritorio de altura ajustable. Se coloca encima del escritorio normal. Ideal para mejorar la postura. Acabado negro, soporta portátil + monitor. Cambio a escritorio completo de pie.',
      category: 'Furniture',
      condition: 'Good',
      isFree: false,
      price: 60,
      location: 'Valencia, España',
      imageUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800'
    },
    {
      userId: users[2].id,
      title: 'Pack Juegos de Mesa',
      description: 'Colección de 5 juegos de mesa: Aventureros al Tren, Catán, Pandemic, Codenames y Azul. Todos completos con todas las piezas. Algunas cajas con desgaste pero los juegos están en excelente estado.',
      category: 'Toys',
      condition: 'Good',
      isFree: false,
      price: 90,
      location: 'Valencia, España',
      imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800'
    },

    // Ana's items (Sevilla)
    {
      userId: users[3].id,
      title: 'Casco y Candado para Bicicleta',
      description: 'Casco de bicicleta Giro (talla M adulto) y candado en U Kryptonite. El casco es negro con buen acolchado, el candado viene con 2 llaves. Regalo porque me mudo al extranjero.',
      category: 'Sports',
      condition: 'Good',
      isFree: true,
      price: null,
      location: 'Sevilla, España',
      imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800'
    },
    {
      userId: users[3].id,
      title: 'Cafetera Espresso',
      description: 'Cafetera espresso Breville Bambino Plus. Hace excelentes espressos y capuchinos. Incluye espumador de leche. Aproximadamente 1 año de uso, funciona perfectamente. Actualicé a modelo más grande.',
      category: 'Home & Garden',
      condition: 'Like New',
      isFree: false,
      price: 280,
      location: 'Sevilla, España',
      imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800'
    },
    {
      userId: users[3].id,
      title: 'Colección Libros Programación',
      description: 'Set de 8 libros de programación incluyendo Clean Code, Patrones de Diseño, JavaScript: Las Buenas Partes. Ideal para desarrolladores. Algunos subrayados y notas dentro.',
      category: 'Books',
      condition: 'Good',
      isFree: false,
      price: 45,
      location: 'Sevilla, España',
      imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=800'
    },

    // Pablo's items (Bilbao)
    {
      userId: users[4].id,
      title: 'Juguetes y Cocinita de Madera',
      description: 'Set de cocinita de juguete de madera con accesorios. Incluye ollas, sartenes, comida de juguete. Perfecto para edades 2-5. Mis hijos ya son mayores. Muy resistente y bien hecha.',
      category: 'Toys',
      condition: 'Good',
      isFree: true,
      price: null,
      location: 'Bilbao, España',
      imageUrl: 'https://images.unsplash.com/photo-1558877385-8c7f5e8d0865?w=800'
    },
    {
      userId: users[4].id,
      title: 'Estantería IKEA Billy',
      description: 'Estantería IKEA Billy en blanco. 5 estantes, 80cm ancho x 200cm alto. Buen estado, algunos roces menores. Hay que desmontar para recoger. Fácil de volver a montar.',
      category: 'Furniture',
      condition: 'Fair',
      isFree: false,
      price: 30,
      location: 'Bilbao, España',
      imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800'
    },
    {
      userId: users[4].id,
      title: 'Tienda de Campaña 4 Personas',
      description: 'Tienda de campaña Coleman para 4 personas. Fácil montaje, toldo impermeable incluido. Usada 3 veces, en excelente estado. Viene con estacas y bolsa de transporte.',
      category: 'Sports',
      condition: 'Like New',
      isFree: false,
      price: 110,
      location: 'Bilbao, España',
      imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800'
    },
    {
      userId: users[4].id,
      title: 'Lote Ropa Mujer - Talla M',
      description: 'Bolsa de ropa de mujer, toda talla M. Mezcla de ropa casual y de trabajo. Marcas como Zara, Mango, Massimo Dutti. Unas 15 prendas en total. Todo limpio y en buen estado.',
      category: 'Clothing',
      condition: 'Good',
      isFree: true,
      price: null,
      location: 'Bilbao, España',
      imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800'
    },

    // Additional items for variety
    {
      userId: users[0].id,
      title: 'Batidora KitchenAid',
      description: 'Batidora de pie KitchenAid clásica en rojo. Capacidad de 5 litros. Incluye accesorio de pala, gancho para masa y varilla. Funciona perfectamente, actualizo a modelo profesional.',
      category: 'Home & Garden',
      condition: 'Good',
      isFree: false,
      price: 175,
      location: 'Madrid, España',
      imageUrl: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800'
    },
    {
      userId: users[1].id,
      title: 'Silla de Oficina Ergonómica',
      description: 'Silla Herman Miller Aeron, talla B (mediana). Excelente silla ergonómica de oficina. Algo de desgaste en reposabrazos pero el mecanismo funciona perfectamente. PVP 1400€, pido fracción de eso.',
      category: 'Furniture',
      condition: 'Good',
      isFree: false,
      price: 450,
      location: 'Barcelona, España',
      imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800'
    },
    {
      userId: users[2].id,
      title: 'Pack Plantas de Interior',
      description: 'Colección de 4 plantas de interior saludables: pothos, filodendro, planta ZZ y espatifilo. Todas en macetas. Ideales para principiantes. ¡Gratis para buen hogar!',
      category: 'Home & Garden',
      condition: 'New',
      isFree: true,
      price: null,
      location: 'Valencia, España',
      imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800'
    }
  ]

  for (const itemData of items) {
    await prisma.item.create({ data: itemData })
  }

  console.log(`✅ Created ${items.length} mock items`)
  console.log('🎉 Database seeding completed!')
  console.log('\n📋 Admin Account:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`   Name: ${admin.name}`)
  console.log(`   Email: ${admin.email}`)
  console.log(`   Password: admin123`)
  console.log(`   Role: ${admin.role}`)
  console.log(`   Location: ${admin.location}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('\n📋 Test User Accounts:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Password: password123`)
    console.log(`   Location: ${user.location}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  })
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
