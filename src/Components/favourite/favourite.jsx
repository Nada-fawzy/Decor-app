import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import './favourite.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { productsContext } from '../../Contexts/productsContextProvider';
import { useNavigate } from 'react-router-dom';

const Fav = () => {
    const [ratings] = useState(Array.from({ length: 5 }, (_, i) => i + 1));
    const [task, setTask] = useState(null);
    const {getProduct} = useContext(productsContext)
    const userId = 1;
    // const navigate = useNavigate();

    useEffect(() => {
        console.log('componentDidMount');
        axios.get(`http://localhost:3000/users/${userId}/favourites?_expand=product`)
            .then(res => {
                console.log(res.data);
                setTask(res.data.filter((item, index, self) =>
                    index === self.findIndex((t) => t.productId === item.productId)
                ));
            });
    }, [userId]);

    // const getProduct = (prodId) => {
    //     axios.get(`http://localhost:3000/products/${prodId}?_embed=comments&_expand=category`)
    //         .then(res => {
    //             console.log('CLASS COMPONENT : ', res.data);
    //             setTask(res.data);
    //             window.location.href = `products/${prodId}`;
    //         })
    //         .catch(err => {
    //             console.log('Error : ', err);
    //         });
    // };

    const removeFav = (favId) => {
        axios.delete(`http://localhost:3000/favourites/${favId}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                axios.get(`http://localhost:3000/users/${userId}/favourites?_expand=product`)
                    .then(res => {
                        console.log(res.data);
                        setTask(res.data.filter((item, index, self) =>
                            index === self.findIndex((t) => t.productId === item.productId)
                        ));
                    });
            });
    };

    console.log('render');
    const handleClick = (event) => {
        setTask((oldTask) => ({ ...oldTask, completed: true }));
    };

    if (!task) return (
        <div className="d-flex justify-content-center vh-100 align-items-center">
          <div className="spinner-grow mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );

    return (
        <div className="container d-flex p-5 px-2 m-auto my-5 rounded-3 justify-content-center flex-wrap cont">
                    {task.map((prod) => (
                        <div className="rounded-3 shadow h-auto mb-4 p-0 mx-2 d-flex flex-column justify-content-start align-items-center" style={{ width: '18rem' }} key={prod.product.id}>
                            <div className="w-100 rounded-top-3 h-75 img" style={{ backgroundImage: `url(${prod.product.paths.img})` }}></div>
                            <div className="p-3 d-flex flex-column justify-content-start align-items-start">
                                <div className="d-flex justify-content-start align-items-center mb-1">
                                    <button className="bg-transparent border-0 p-0 m-0 text-start" onClick={() => getProduct(prod.product.id)}>
                                        <h4 className="m-0">{prod.product.name}</h4>
                                    </button>
                                    <button className="bg-transparent border-0" onClick={() => removeFav(prod.id)}>
                                        <i className="fas fa-heart p-2 icon m-0 rounded-5 border-0"></i>
                                    </button>
                                </div>
                                <div>
                                    {ratings.map((rating, index) => (
                                        <FontAwesomeIcon
                                            key={index}
                                            icon={faStar}
                                            className={`icon m-0 bg-transparent ${rating <= prod.product.rate ? 'fas' : 'far'}`}
                                        />
                                    ))}
                                </div>
                                <h5 className="mt-2 mb-1">{prod.product.price} EGP</h5>
                            </div>
                        </div>
                    ))}
        </div>
    );
};

export default Fav;
