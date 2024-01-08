import { verify } from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express"

type User = {
    email: string;
    name: string;
    password: string;
    role?: string;
}

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        console.log(token)

        if (!token) {
            return res.status(401).send("Unauthorized")
        }

        const verifiedUser = await verify(token, "my-secret-key")

        if (!verifiedUser) {
            return res.status(401).send("Unauthorized")
        }

        req.user = verifiedUser as User

        next()

    } catch (err) {
        return res.status(500).send({
            message: JSON.stringify(err),
            data: []
        })
    }

}

export const adminGuard = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        if (req.user?.role !== "admin") {
            return res.status(401).send("UnAuthorized")
        }

        next()

    } catch (err) {
        return res.status(500).send({
            message: JSON.stringify(err),
            data: []
        })
    }
}

export const userGuard = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        console.log(" req.user => ", req.user)

        if (!req.user?.role) {
            return res.status(401).send("UnAuthorized")
        }

        next()

    } catch (err) {
        return res.status(500).send({
            message: JSON.stringify(err),
            data: []
        })
    }
}