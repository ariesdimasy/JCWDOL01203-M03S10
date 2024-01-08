import express, { Router } from "express"
import * as AuthController from "./../controllers/auth.controller"

const router: Router = express.Router()

router.get("/login", AuthController.login)
router.post("/register", AuthController.register)

export default router