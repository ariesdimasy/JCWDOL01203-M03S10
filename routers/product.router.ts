import express, { Router } from "express"
import * as ProductController from "./../controllers/product.controller"
import { adminGuard, userGuard, verifyToken } from "../middlewares/auth.middleware"

const router: Router = express.Router()

router.get("/", ProductController.getProduct)
router.get("/product-secret", verifyToken, adminGuard, ProductController.getProductSecret)
router.get("/product-user", verifyToken, userGuard, ProductController.getProductUser)


export default router