import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface registerUsecaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUsecase({
  name,
  email,
  password
}: registerUsecaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  
  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }
  
    await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })
}