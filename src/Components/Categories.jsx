import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {v4 as uuid} from "uuid"
import { categoriesContext } from '../Contexts/CategoriesContextProvider';
import { Spinner } from 'react-bootstrap';
import Category from './Category';
import { Link } from "react-router-dom"
import categoryStyle from "../Styles/Categories.css"

const Categories = ({categoriesArr}) => {

    console.log(categoriesArr);

    if (!categoriesArr) { return <Spinner></Spinner> }
    return (
        <div className="container  mb-5">
            <h3 className='header py-3'>Popular Categories</h3>
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
                                <button className='btn btn-outline-dark' > Show Products </button>
                                </Link>  
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );

}

export default Categories;