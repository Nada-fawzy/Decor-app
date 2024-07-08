// import logo from '../logo.svg';
import './App.css';
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

import "bootstrap/dist/css/bootstrap.css"

import { BrowserRouter, Route, Outlet, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import axios from "axios";
import CategoriesContextProvider from '../Contexts/CategoriesContextProvider';
import '@fortawesome/fontawesome-free/css/all.min.css';

//import Products from '../Pages/products/products'
import { Spinner } from 'react-bootstrap';
import CartContextProvider from '../Contexts/cartContextProvider';
import ProductsContextProvider from '../Contexts/productsContextProvider';
import SimpleBackdrop from '../Components/Spinner';
import ContactUsComponent from '../Components/contactUs';
import LoginComponent from '../Components/login';
import Payment from '../Components/payment';
import CategoryProd from '../Pages/CategoryProd';
import AddProductComponent from '../Pages/add-product';
// import ProductDetails from '../Pages/productDetails/productDetails';
const Home = lazy(() => import('../Pages/Home'))
const NotFound = lazy(() => import('../Pages/NotFound'))
const Products = lazy(() => import('../Pages/products/products'))
const ProductDetails = lazy(() => import('../Pages/productDetails/productDetails'))
const Favourite = lazy(() => import('../Components/favourite/favourite'))
const Cart = lazy(() => import('../Pages/cart/Cart'))
const Profile = lazy(() => import('../Components/Profile'))


function App() {
  const id = localStorage.getItem('id')

  // const AppLayout = () => (
  //   <>
  //     <NavBar />
  //     <Outlet />
  //     <Footer/>

  //   </>
  // );
  // const router = createBrowserRouter([
  // {
  //   element: <AppLayout />, 
  //   children: [
  //     {
  //       path: '/',
  //       element: <Home />,
  //       loader: loadData
  //     },
  //     {
  //       path: '/products',
  //       element: <Products/>,
  //     },
  //     {
  //       path: '/products/:id',
  //       element: <ProductDetails/>,
  //     },
  //     {
  //       path: '*',
  //       element: <NotFound />
  //     }
  //   ]
  // }])
  return (

    //       <Suspense fallback={<Spinner/>}>
    //         <CategoriesContextProvider>
    //           <CartContextProvider>
    //             <ProductsContextProvider>
    //               <RouterProvider router={router} />    
    //             </ProductsContextProvider>
    //           </CartContextProvider>
    //         </CategoriesContextProvider>
    //       </Suspense>
    <Suspense fallback={<SimpleBackdrop></SimpleBackdrop>}>
      <BrowserRouter>
        <NavBar></NavBar>
        <ProductsContextProvider>
          <CategoriesContextProvider>
            <CartContextProvider>
              <Routes >
                <Route >
                  {localStorage.getItem('id') ?
                    <Route path="/" element={<Home></Home>}></Route>
                    :
                    <Route path="/" element={<LoginComponent></LoginComponent>}></Route>
                  }
                  <Route path="/home" element={<Home></Home>}></Route>
                  <Route path="/login" element={<LoginComponent></LoginComponent>}></Route>
                  <Route path='products' element={<Products></Products>}></Route>
                  <Route path='products/:id' element={<ProductDetails></ProductDetails>}></Route>
                  <Route path='cart' element={<Cart></Cart>}></Route>
                  <Route path='contactUs' element={<ContactUsComponent></ContactUsComponent>}></Route>

                  <Route path='favourites' element={<Favourite></Favourite>}></Route>
                  <Route path='payment' element={<Payment></Payment>}></Route>
                  <Route path='categories/:id' element={<CategoryProd></CategoryProd>}></Route>
                  <Route path="/profile" element={<Profile></Profile>} />
                  <Route path="/addProduct" element={<AddProductComponent></AddProductComponent>} />
                  <Route path="*" element={<NotFound></NotFound>}></Route>
                </Route>
              </Routes>
            </CartContextProvider>

          </CategoriesContextProvider>
        </ProductsContextProvider>
        <Footer></Footer>
      </BrowserRouter>
    </Suspense>

  )
}
/* <Suspense fallback={<Spinner></Spinner>}>
       <BrowserRouter>
         <NavBar></NavBar>
         <Routes >
           <Route >
             <Route path="/" element={<Home></Home>}></Route>
             <Route path="categories" element={<CategoriesPage></CategoriesPage>} loader={loadData}></Route>
             <Route path="*" element={<NotFound></NotFound>}></Route>
           </Route>
         </Routes>
         <CategoriesContextProvider></CategoriesContextProvider>
       </BrowserRouter>

     </Suspense> */

export default App;
