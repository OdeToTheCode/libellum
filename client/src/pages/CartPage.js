import { useState, useEffect ,useContext } from "react"
import cookie from "js-cookie"



import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const shoppingCart = JSON.parse(localStorage.getItem("cart"));
    setCart(shoppingCart);
  }, [cart, setCart]);
  return (
    <>
      <h1>Cart</h1>
      <div class="container">
        <div class="row">
        <p> {JSON.stringify(cart)}</p>
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