import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Categories from '../Components/Categories';
import { useLoaderData } from 'react-router-dom';
import "../Styles/Home.css"
import axios from 'axios';
import ProductCarousel from '../Components/productCarousel';
import ProductsContextProvider from '../Contexts/productsContextProvider';
const Home = () => {
    const [categoriesArr, setCategoriesArr] = useState()
    const loadData = async () => {
        console.log("loaderrr");
        const res = await axios.get("http://localhost:3000/categories")
        // console.log(res.data);
        setCategoriesArr(res.data)
        return res.data;
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <>
            <div className="home-container">
                <div className="background"></div>
                <div className="content">
                    <h1>MODERN DESIGN MEETS COZY COMFORT</h1>
                    <h4>Create the perfect space</h4>
                    <Link to={`/products`}>
                        <button style={{ color: 'white', backgroundColor: "#58175a" }} className='btn w-25 btnShop m-auto mt-3 ' >Shop Now

                        </button>
                    </Link>
                </div>
            </div>


            {/* Products */}


            {/* map array of product */}
            {/* <div className="container  mb-5">
            <h3 className='header text-center mt-5 py-5'>Our best Sellers Products</h3>
            <div className="row">
                {categoriesArr.map(category => (
                    <div key={category.id} className="col-md-4 d-flex " >
                        <div className="card mb-4 category shadow">
                            <img src={category.image} className="card-img-top" style={{height:'200px'}} alt={category.name} />
                            <div className="card-body " style={{textAlign:'center'}}>
                                <h5 className="card-title">{category.name}</h5>
                                <h6 className="card-title mb-3">{category.description}</h6>
                                <div   style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}  >
                                <Link to={`/categories/${category.id}`}  className='w-100'>
                                <button className='btn btn-primary ' > Show Products </button>
                                </Link>  
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div> */}

                <ProductCarousel></ProductCarousel>
            {/* Categories */}
            <div>
                <Categories categoriesArr={categoriesArr}></Categories>
            </div>

        </>
    )
};

export default Home;
