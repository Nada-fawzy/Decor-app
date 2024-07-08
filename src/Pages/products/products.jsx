import React, { useContext} from 'react';
import './products.css'
// import axios from 'axios';
// import img from '../../2.jpg'
import { productsContext } from '../../Contexts/productsContextProvider';
import { useNavigate } from 'react-router-dom';
const Products = () => {

  const {products , getProduct} = useContext(productsContext)
  const navigate = useNavigate()
  // const [products , setProducts] = useState(null)

  // useEffect(()=>{
  //   axios.get('http://localhost:3000/products')
  //   .then((res) => {
  //     console.log(res.data);
  //     setProducts((prods) => res.data)
  //     console.log(products);
  //   })
  // } , [])

    if(!products) {
      return (
        <div className="d-flex justify-content-center vh-100 align-items-center ">
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
      <>
      <button className='btn btn-dark p-2 px-4 rounded-5 w-auto m-auto mt-3'
        onClick={()=>navigate('/addProduct')}
      >Add New Product</button>
        <div className="container d-flex p-5 pt-1 px-2 m-auto my-5 mt-2 rounded-3 justify-content-center flex-wrap cont">
          {products.map((prod) => (
            <div key={prod.id} className="rounded-3 shadow h-auto mb-4 mx-2 cursor-pointer bg-light" style={{ width: '18rem' }}>
              {prod.paths ? <div
                className="w-100 rounded-top-3 img"
                style={{ backgroundImage: `url(${prod.paths.img})` , height:'250px'}}
              ></div>: <div></div>}
              
              <div className="p-3 d-flex flex-column align-items-center">
                <div className="d-flex justify-content-between align-items-start">
                  <button className="bg-transparent border-0 text-start p-0" 
                  onClick={() => getProduct(prod.id)}>
                    <h4 className="m-0">{prod.name}</h4>
                  </button>
                </div>
                <div>
                  {[1, 2, 3, 4, 5].map((star, i) => (
                    <i
                      key={i}
                      className={`icon m-0 mt-1 bg-transparent ${i < prod.rate ? 'fas' : 'far'} fa-star`}
                    ></i>
                  ))}
                </div>
                <h5 className="mt-2 mb-1 text-light p-1 rounded-2" style={{backgroundColor:'#c057f7'}}>{prod.price} EGP</h5>
              </div>
            </div>
          ))}
        </div>
        </>
      );
};

export default Products;