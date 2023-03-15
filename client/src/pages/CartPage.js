import { useState, useEffect ,useContext } from "react"
import cookie from "js-cookie"

import axios from "axios"

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'

const Cart = (props) => {
   const [cart, setCart] = useState([]);
//   useEffect(() => {
//     const shoppingCart = JSON.parse(localStorage.getItem("cart"));
//     setCart(shoppingCart);
//   }, [cart, setCart]);



const fetchCart = async () => {
  const response = await axios.get("/api/cart/6410a488e92a1b2cecf54d3a");
 setCart(response.data.books);
}

useEffect(() => {
  fetchCart();
},[setCart, cart]) 

const renderCart = () => {
  return cart.map((item) => {
    return (
      <div>
        <h1>{item.title}</h1>
        <h2>{item.author}</h2>
        <h3>${item.price}</h3>
        <input type = "checkbox" name = "delete" value = "delete" />
      </div>
    )
  })
}

  return (
    <>
      <h1>Cart</h1>
      <div class="container">
        <div class="row">
        {renderCart()}


          <div class="col-9">

          </div>

          <div class="col-3">

          </div>

        </div>
      </div>
    </>
  )
}

export default Cart