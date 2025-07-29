import express from "express"
import controller from "../controllers/productController.mjs"
import userController from "../controllers/userController.mjs"
import { upload } from "../cloudinaryConfig.mjs"

const router = express.Router()

router
//GET REQUESTs

.get("/",controller.getAllProducts)
.get("/product/:id",controller.getProduct)

//POST REQUESTs
.post("/addproduct",controller.addProduct)
//file upload middleware
.post("/addproductwithimage", upload.single("image")  ,controller.addProductWithImage


)
//DELETE REQUESTs
.delete("/deleteproduct/:id",controller.deleteProduct)

//DELETE REQUESTs
.put("/editproduct/:id",controller.editProduct)

//User
.post("/auth/signup",userController.Signup)
.post("/auth/login",userController.Login)
.get("/users",userController.getAllUsers)
.get("/users/verify",userController.sendVerification)

.patch("/user/change-activation-status/:id/:status",userController.ChangeActivationStatus)

export default router