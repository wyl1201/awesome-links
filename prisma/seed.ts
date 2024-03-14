import { Prisma, PrismaClient } from '@prisma/client'
import { links } from '../data/links'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'testemail.gmail.com' },
    update: {},
    create: {
      email: 'testemail.gmail.com',
      role: 'ADMIN',
    },
  })

  await prisma.link.createMany({ data: links })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
