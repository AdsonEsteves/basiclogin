// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({message:"method not allowed"})
  }
  try {
    const data = JSON.parse(req.body)
    await prisma.user.create({data})
    res.status(200).json({message: "user created succesfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"we had a problem \n"+error})
  }
}
