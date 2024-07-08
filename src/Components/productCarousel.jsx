import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../Styles/carousel.css'
import CarouselItem from 'react-bootstrap/CarouselItem';
import { productsContext } from '../Contexts/productsContextProvider';
import axios from 'axios';

function ProductCarousel() {
    // const { products } = useContext(productsContext);
    const [products , setProducts] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000/products')
        .then((res)=>{
            console.log(res.data);
            setProducts(()=> res.data)
        })
    },[])

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length ; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const productChunks = chunkArray(products, 3);

    if(!products) return <div>Loading...</div>
    return (
        <>
        <h3 className='header py-3'>Lateset Products</h3>
        <Carousel className='mt-3 mx-5'>
            {
                productChunks.map((chunk, index) => (
                    <Carousel.Item interval={3000} key={index}>
                        <div className="d-flex justify-content-around">
                            {chunk.map((prod) => (
                                <div className='d-flex flex-column align-items-center'>
                                <div key={prod.id} className=" p-2 shadow mb-2 rounded-top-4" 
                                style={{ backgroundImage: `url(${prod.paths.img})` , height:'300px' , width:'300px' ,
                                    backgroundRepeat:'no-repeat' , backgroundSize:'cover'}}
                                >
                                    {/* <img src={prod.paths.img} alt={prod.name} className="w-100 " /> */}
                                </div>
                                <h5 className='w-100 py-2 text-center border-bottom rounded-4 '>{prod.name}</h5 ></div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))
            }
        </Carousel>
        </>
    );
}

export default ProductCarousel;
