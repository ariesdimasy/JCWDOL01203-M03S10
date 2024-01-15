import express, { Application, Request, Response } from "express"
import cors from "cors"
import authRouter from "./routers/auth.router"
import productRouter from "./routers/product.router"
import userRouter from "./routers/user.router"
import { logErrorHandler } from "./middlewares/logErrorHandler"

const app: Application = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// app.use((req, res, next) => {
//     logErrorHandler("Error happen")
//     next()
// })
app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)

const PORT: number = 5670

app.get("/api/", (req: Request, res: Response) => {
    return res.status(200).send({
        message: "OK",
        data: "hello world"
    })
})

app.listen(PORT, () => {
    console.log("application running on PORT = ", PORT)
})