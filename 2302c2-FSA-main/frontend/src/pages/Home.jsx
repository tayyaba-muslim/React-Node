// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import Products from '../components/Products';
import Footer from '../components/Footer';
import axios from 'axios'

const Home = () => {
let [products, setProducts ]= useState([])

  const getProducts=async ()=>{
    let getProd= await axios.get("http://localhost:3000/");
    if(getProd.data){
      console.log(getProd.data.myproducts)
      setProducts(getProd.data.myproducts)
    }else{
      console.log(getProd.data.error)
    }
  }

  useEffect(()=>{
    getProducts();
  }, [])

  return (
    <div>
      <Banner />
      <Categories />
      <BestSelling />
      <Products products={products} />
      <Footer/>
    </div>
  );
};

export default Home;
