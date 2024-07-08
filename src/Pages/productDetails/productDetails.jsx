import React, { useContext, useState } from 'react';
import styles from './productDetails.module.css'
import { productsContext } from '../../Contexts/productsContextProvider';

function ProductDetails() {
    const {product , addToFav , addToCart , deleteComment , addComment} = useContext(productsContext)
    const [lgImg , setLgImg] = useState(product.paths.img)
    const [comment , setComment] = useState('')
    const selectImg = (img) =>{
        setLgImg(() => img)
    }


    if (!product) {
        return (
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
      }
    
      return (
        <div className="w-75 shadow d-flex p-2 m-auto my-5 rounded-3">
        <div className={`w-50 d-flex flex-column ${styles.imgContainer}`}>
          <div className={styles.lgImg}>
            {lgImg ? (
              <div className="w-100 px-2 pt-2">
                <img src={lgImg} className="w-100 rounded-3 shadow" alt="Product" />
              </div>
            ) : (
              <div className="d-flex justify-content-center h-100 align-items-center">
                <div className="spinner-grow spinner-grow-sm mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow spinner-grow-sm mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow spinner-grow-sm mx-1" style={{ width: '3rem', height: '3rem' }} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <div className={`w-100 d-flex align-items-center justify-content-around mt-3 ${styles.smImgs}`}>
              {product.paths.icon.map((icon, index) => (
                <img
                  key={index}
                  src={icon}
                  className={`${styles.prodThumbnil} w-25 rounded-3 p-1 h-auto`}
                  alt={`Thumbnail ${index}`}
                  onClick={() => selectImg(icon)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-50 p-2 px-4">
          <div className="d-flex justify-content-between align-items-start">
            <h3>{product.name}</h3>
            <button className="bg-transparent border-0" 
            onClick={() => addToFav(product.id)}
            >
              <i className={`fas fa-heart p-2 m-0 mt-2 rounded-5 border-0 ${styles.icon}`}></i>
            </button>
          </div>
          <div className="mt-3">
            <p>{product.description}</p>
            <div className="d-flex mt-3">
              <h6>Category: </h6>
              <p className="mx-1">{product.category.name}</p>
            </div>
          </div>
          <div className="mt-3">
            <h3>{product.price} EGP</h3>
            <div className="d-flex justify-content-start mt-1">
              {[1, 2, 3, 4, 5].map((star, i) => (
                <i
                  key={i}
                  className={`icon m-0 bg-transparent ${i < product.rate ? 'fas' : 'far'} fa-star`}
                ></i>
              ))}
            </div>
          </div>
          <div className="mt-4 w-50">
            {product.color.length > 0 && (
              <>
                <h6>Colors</h6>
                <div className="d-flex">
                  {product.color.map((color, index) => (
                    <div key={index} className={`${styles.colorIcon} rounded-5 me-1 shadow`} style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              </>
            )}
          </div>
          <button className={`mt-4 px-3 py-2 rounded-4 ${styles.addToCart}`} 
          onClick={() => addToCart(product.id)}>
            <i className={`fas fa-cart-shopping icon bg-transparent me-2`}></i>Add To Cart
          </button>
          <div className="w-100 mt-4">
            <h4 className={`comments pb-2 ${styles.comments}`}>Comments</h4>
            {product.comments.map((comment) => (
              <div key={comment.id} className="d-flex justify-content-between my-3 align-items-center shadow p-2 rounded-3">
                <div className="d-flex align-items-center justify-content-start">
                  <i className="fas fa-user icon p-2 rounded-5 me-2"></i>
                  {comment.text && (
                    <div>
                      {/* <h6 className="m-0 p-0">{comment.user.name}</h6> */}
                      <p>{comment.text}</p>
                    </div>
                  )}
                </div>
                <button className="bg-transparent border-0" 
                onClick={() => deleteComment(comment.id , product.id)}
                >
                  <i className="fas fa-trash text-danger rounded-5 "></i>
                </button>
              </div>
            ))}
            <div className="d-flex justify-content-start my-4 align-items-center">
              <i className={`fas fa-user icon p-2 rounded-5 me-2 ${styles.icon}`}></i>
              <input type="text" className="w-75 rounded-3 px-2 me-1 py-1" placeholder="write your comment.." 
              value={comment}
              onChange={(e) => setComment(e.target.value)}/>
              <button className="bg-transparent border-0" 
              onClick={(e) => {
                addComment(comment , '1' , product.id)
                setComment('')
              }}
              >
                <i className={`fas fa-paper-plane m-0 mx-1 fs-5 ${styles.sendIcon}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );

}

export default ProductDetails;