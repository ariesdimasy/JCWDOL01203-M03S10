import express, { Request, Response } from "express"
import { compare, genSalt, hash } from "bcrypt"
import { sign } from "jsonwebtoken"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type User = {
    name: string,
    email: string,
    password: string,
    role: string
}

export async function register(req: Request, res: Response) {
    try {

        const { name, email, password, role } = req.body

        const findUser = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })

        if (findUser) {
            return res.status(400).send({
                message: "email already exist",
                data: {}
            })
        }

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        const createUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                created_at: new Date(),
                role: role
            }
        })

        return res.status(200).send({
            message: "OK",
            data: createUser
        })

    } catch (err) {
        return res.status(500).send({
            message: JSON.stringify(err),
            data: []
        })
    }
}

export async function login(req: Request, res: Response) {

    try {

        const { email, password } = req.body

        const findUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!findUser) {
            return res.status(400).send({
                message: "invalid email or password",
                data: {}
            })
        }

        const isValidPassword = await compare(password, findUser.password)

        const payload = { email: email, role: findUser.role }
        const token = sign(payload, "my-secret-key", { expiresIn: "1h" })

        if (!isValidPassword) {
            return res.status(400).send({
                message: "invalid email or password",
                data: {}
            })
        }

        return res.status(200).send({
            message: "OK",
            data: findUser,
            token: token
        })
    } catch (err) {
        return res.status(500).send({
            message: JSON.stringify(err),
            data: {}
        })
    }
}

