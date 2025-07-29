import fs from "node:fs"

const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
let products = data.products;


const getAllProducts=(req, res) => {
  res.json(products)
}
const getProduct=(req, res) => {
    const id =  req.params.id;
    console.log(id);
    let product= products.filter((prd,index)=>{
        if(prd.id ==id){
            return prd}
    })
console.log(product);
if (product.length >0) {
  res.json({ product: product})
} else {
  res.status(404).json({ msg: "Product not found"})
}
}
const addProduct=(req,res)=>{
// console.log(req.body.id)
const newProduct= {
  id:req.body.id,
  title:req.body.title,
  description:req.body.description,
  price:req.body.price,
  discountPercentage:req.body.discountPercentage,
  rating:req.body.rating,
  category:req.body.category,
  stock:req.body.stock,
  brand:req.body.brand,
  images:req.body.images,
  thumbnail:req.body.thumbnail,
}

products = [...products, newProduct];
  res.json({ msg: "product added succesfully",
    newproduct: newProduct
  })
}
const deleteProduct=(req, res) => {
    const id =  req.params.id;
    console.log(id);

     products= products.filter((prd,index)=>{
        if(prd.id !=id){
            return prd
          }
    })

      res.json({ msg:"product deleted successfully"})

// if (products.length >0) {
// } else {
//   res.status(404).json({ msg: "Products are empty"})
// }
}


const productController= {getAllProducts,getProduct, addProduct, deleteProduct}
export default productController