import express, { Router } from "express"
import * as ProductController from "./../controllers/product.controller"
import { adminGuard, userGuard, verifyToken } from "../middlewares/auth.middleware"

const router: Router = express.Router()

router.get("/product-secret", verifyToken, adminGuard, ProductController.getProductSecret)
router.get("/product-user", verifyToken, userGuard, ProductController.getProductUser)
router.get("/product", ProductController.getProduct)

export default router