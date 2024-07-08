import React from 'react';
import Types from "prop-types"

import { memo } from "react"
import { Link } from "react-router-dom"

const Category = (props) => {
    let {id,name,image,desc,children} =props

    return <div >
    <div>id:{id}</div>
   <div>Name: {name}</div>
   <img src={image} /> 
   <div>Name: {desc}</div>
  <div>{children}</div>
  {/* <Link to={`//${id}`}>
  <button className={classes.btn} >see more</button>
  </Link> */}
</div>
};

export default memo(Category);