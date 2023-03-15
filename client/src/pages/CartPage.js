import { useState, useEffect, useContext } from "react"
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
    const response = await axios.get("/api/cart/641122fd28efa32510553639");
    setCart(response.data.books);
  }

  useEffect(() => {
    fetchCart();
  }, [setCart, cart])

  const renderCart = () => {
    return cart.map((item) => {
      return (
        <>
          <div class="container">
            <div class="row">
              <div class="col-9">
                <img src={item.image} alt={item.title} />
                <h1>{item.title}</h1>
                <h2>{item.author}</h2>

              </div>
              <div class="col-3">

                <h3>${item.price}</h3>
                <input type="checkbox" name="delete" value="delete" />

              </div>
            </div>
          </div>
        </>
      )
    })
  }

  return (
    <>
      <h1 style={{"text-align": "center"}}>Your Cart</h1>
      <div>
        {renderCart()}
      </div>
    </>
  )
}

export default Cart