import express, { Request, Response } from "express"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getProductSecret(req: Request, res: Response) {
    try {

        return res.status(200).send({
            message: "get product secret success",
            data: [
                {
                    name: "product secret 1",
                    price: 56_000_000,
                    author: "William"
                }, {
                    name: "product secret 2",
                    price: 45_000_000,
                    author: "Benedict Camberbach"
                }
            ]
        })

    } catch (err) {
        return res.status(500).send({
            message: JSON.stringify(err),
            data: []
        })
    }
}

export async function getProductUser(req: Request, res: Response) {
    try {

        return res.status(200).send({
            message: "get product user success",
            data: [
                {
                    name: "product user 1",
                    price: 4_000_000,
                    author: "Toby"
                }, {
                    name: "product user 2",
                    price: 6_000_000,
                    author: "Harry"
                }
            ]
        })

    } catch (err) {
        return res.status(500).send({
            message: JSON.stringify(err),
            data: []
        })
    }
}

export async function getProduct(req: Request, res: Response) {
    try {

        return res.status(200).send({
            message: "get product success",
            data: [

            ]
        })

    } catch (err) {
        return res.status(500).send({
            message: JSON.stringify(err),
            data: []
        })
    }
}