import express from 'express'
// import fs from "node:fs"
// import { title } from 'node:process';
import router from './Routes/router.mjs';
import dotenv from "dotenv"

const app = express()
dotenv.config()
const port = process.env.PORT
// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
// let products = data.products;

//middleware
//body parser
app.use(express.json())
app.use("/",router)

//REST APIs
// app.get('/', (req, res) => {
//   res.json(products)
// })
//route parameters
// app.get('/product/:id', (req, res) => {
//     const id =  req.params.id;
//     console.log(id);
//     let product= products.filter((prd,index)=>{
//         if(prd.id ==id){
//             return prd}
//     })
// console.log(product);
// if (product.length >0) {
//   res.json({ product: product})
// } else {
//   res.status(404).json({ msg: "Product not found"})
// }
// })

//add 
// app.post("/addproduct",(req,res)=>{
// // console.log(req.body.id)
// const newProduct= {
//   id:req.body.id,
//   title:req.body.title,
//   description:req.body.description,
//   price:req.body.price,
//   discountPercentage:req.body.discountPercentage,
//   rating:req.body.rating,
//   category:req.body.category,
//   stock:req.body.stock,
//   brand:req.body.brand,
//   images:req.body.images,
//   thumbnail:req.body.thumbnail,
// }

// products = [...products, newProduct];
//   res.json({ msg: "product added succesfully",
//     newproduct: newProduct
//   })
// })

//delete product
// app.delete('/deleteproduct/:id', (req, res) => {
//     const id =  req.params.id;
//     console.log(id);

//      products= products.filter((prd,index)=>{
//         if(prd.id !=id){
//             return prd
//           }
//     })

//       res.json({ msg:"product deleted successfully"})

// // if (products.length >0) {
// // } else {
// //   res.status(404).json({ msg: "Products are empty"})
// // }
// })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
