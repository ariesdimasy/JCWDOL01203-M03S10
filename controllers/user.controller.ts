import { Request, Response } from "express";
import redisClient from "../helpers/redisClient";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export function getUserDetail(req: Request, res: Response) {
    const userId = parseInt(req.params.id)

    console.log("userId => ", userId)
    console.log("klo ini log")
    console.warn("klo ini log")
    console.error("klo ini log")
    redisClient.get(`user:${userId}`, async (error: any, cachedData: any) => {
        console.log("errornya kemungkinan sebelum baris ini")
        if (error) {
            return res.status(500).json({
                error: 'Internal Server Error'
            })
        }

        if (cachedData) {
            return res.json(JSON.parse(cachedData))
        } else {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })

            console.log("user => ", user)

            if (!user) {
                return res.status(404).json({ error: 'user not found' })
            }

            await redisClient.setEx(`user:${userId}`, 3600, JSON.stringify(user))

            return res.json(user)
        }


    })
}