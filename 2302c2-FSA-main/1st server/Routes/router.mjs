import express from "express"
const router = express.Router()
import productController from "../Controllers/productController.mjs"

router
.get('/', productController.getAllProducts)
.get('/product/:id', productController.getProduct)
.post("/addproduct",productController.addProduct)
.delete('/deleteproduct/:id', productController.deleteProduct)

export default router;