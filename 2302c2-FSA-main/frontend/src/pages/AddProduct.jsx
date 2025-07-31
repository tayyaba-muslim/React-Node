import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
const AddProduct = () => {
let [categories, setCategories ]= useState([])

  const getCategories=async ()=>{
    let getCat= await axios.get("http://localhost:3000/categories");
    if(getCat.data){
      console.log(getCat.data.myCategory)
      setCategories(getCat.data.myCategory)
    }else{
      console.log(getCat.data.error)
    }
  }

  useEffect(()=>{
    getCategories();
  }, [])

  const addProduct=()=>{

  }

  return (
    <div clasName='container my-4'>
        <h1>Adding product</h1>
          <form>
                <input type="text" className='form-control my-2' id="title" placeholder='Enter Title' />
                <input type="text" className='form-control my-2' id="desc" placeholder='Enter description' />
                <input type="text" className='form-control my-2' id="price" placeholder='Enter price' />
                <input type="text" className='form-control my-2' id="rating" placeholder='Enter rating' />
                <input type="text" className='form-control my-2' id="disc" placeholder='Enter discount percentage' />
                <input type="text" className='form-control my-2' id="stock" placeholder='Enter stock' />
                <select className='form-control my-2' id="category">
                    <option value="" selected disabled>choose Category</option>
                    {
                        categories?.map((cat, index) => {
                            return (
                                <option key={index} value={cat._id} >{cat.title}</option>
                            )
                        })
                    }
                </select>
                <input type="text" className='form-control my-2' id="brand" placeholder='Enter brand' />
                <input type="text" className='form-control my-2' id="images" placeholder='Enter images' />

                <button className='btn btn-danger' onClick={addProduct}>Add Product</button>
            </form>


    </div>
  )
}


export default AddProduct