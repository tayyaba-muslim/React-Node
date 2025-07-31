import Category from "../models/category.mjs"

const getAllCategories=async(req,res)=>{
try {
    const category= await Category.find();
if(category.length > 0){
    res.json({msg:"Showing our products!", myCategory:category})   
}else{   
    res.status(200).json({msg:"No Category found",myCategory:category})
}  
} catch (error) {
    res.status(500).json({msg:error})
}
}
// single product details
// const getProduct=async(req,res)=>{
// try {
//     const id= req.params.id;
//     const product= await Product.findOne({_id:id});
// if(product){
//     res.json({msg:"Product Found!", products:product})
   
// }else{
//     res.status(404).json({msg:"No product found"})
// } 
// } catch (error) {
//     res.status(500).json({msg:error})
// }
// }

//adding a product in db
// const addCategory=async(req,res)=>{

// try {
//     // let {title,description, price} = req.body
//     let newCategory = {
//         title:req.body.title,
//         description:req.body.description
//     }
//     const addCategory= await Category.insertOne(newCategory);
// if(addCategory){
//     res.json({msg:"Product added successfully!", addedCategory:addCategory})
    
// }else{
//     res.status(404).json({msg:"Failed to add category right now, try again"})
// }
// } catch (error) {
//     res.status(500).json({msg:error})
// }}

const addCategory = async (req, res) => {
  try {
    // Expecting req.body to be an array of categories like:
    // [{ title: "Cat1", description: "Desc1" }, { title: "Cat2", description: "Desc2" }, ...]
    
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ msg: "Please send an array of categories" });
    }

    // Optionally validate each category object here (e.g. check required fields)

    // Insert many documents at once
    const insertedCategories = await Category.insertMany(req.body);

    if (insertedCategories) {
      res.json({
        msg: "Categories added successfully!",
        addedCategories: insertedCategories,
      });
    } else {
      res.status(404).json({ msg: "Failed to add categories, try again" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message || error });
  }
};



// delete product
// const deleteProduct=async(req,res)=>{
// try {
//     const id= req.params.id;
//     const product= await Product.deleteOne({_id:id});
// if(product){
//     res.json({msg:"Product Deleted Successfully!", products:product}).status(200)
   
// }else{
//     res.status(400).json({msg:"Failed to delete product"})
// } 
// } catch (error) {
//     res.status(500).json({msg:error})
// }}


// // edit product

// const editProduct=async(req,res)=>{

// try {
//   const id= req.params.id;
//     let updatedProduct = {
//         _id:id,
//         title:req.body.title,
//         description:req.body.description,
//         price:req.body.price,
//         discountPercentage:req.body.discountPercentage,
//         rating:req.body.rating,
//         brand:req.body.brand,
//         category:req.body.category,
//         stock:req.body.stock,
//         images:[req.body.images],
//     }
//     const editProduct = await Product.updateOne({_id:id},updatedProduct);
// if(editProduct){
//     res.json({msg:"Product edited successfully!", addedProduct:addProduct})
    
// }else{
//     res.status(404).json({msg:"Failed to edit product right now, try again"})
// }
// } catch (error) {
//     res.status(500).json({msg:error})
// }}

// //file uploading
// //adding a product in db
// const addProductWithImage=async(req,res)=>{
    
// console.log(req.file.path)
// try {
//     // let {title,description, price} = req.body
//     let newProduct = {
//         title:req.body.title,
//         description:req.body.description,
//         price:req.body.price,
//         discountPercentage:req.body.discountPercentage,
//         rating:req.body.rating,
//         brand:req.body.brand,
//         category:req.body.category,
//         stock:req.body.stock,
//         images:[req.file.path],
//     }
//     const addProduct = await Product.insertOne(newProduct);
// if(addProduct){
//     res.json({msg:"Product added successfully!", addedProduct:addProduct})
    
// }else{
//     res.status(404).json({msg:"Failed to add product right now, try again"})
// }
// } catch (error) {
//     res.status(500).json({msg:error})
// }}


const categoryController= {getAllCategories, addCategory}
export default categoryController