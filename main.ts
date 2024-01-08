import express, { Application, Request, Response } from "express"
import cors from "cors"
import authRouter from "./routers/auth.router"
import productRouter from "./routers/product.router"

const app: Application = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())


app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)

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