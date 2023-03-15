import { useState, useEffect, useContext } from "react"
import cookie from "js-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate()

  const fetchCart = async () => {
    const response = await axios.get("/api/cart/6411edbaee3a5f3e641b0f66");
    setCart(response.data.books);
  }

  const deleteBook = async (id) => {
    const response = await axios.delete(`/api/cart/6411edbaee3a5f3e641b0f66/${id}`);
    setCart(response.data.books);
  }

  useEffect(() => {
    fetchCart();
  }, [setCart, cart])


  const redirectToPage = () => {
    navigate('/checkout', {replace: true}); 
  }    

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
                <button onClick={() => deleteBook(item._id)}>delete</button>

                <button onClick={redirectToPage}>test</button>

              </div>
            </div>
          </div>
        </>
      )
    })
  }

  // const deleteBook = async (bookid.ID) => {
  //   const response = await axios.delete(`/api/cart/641122fd28efa32510553639/${item.ID}`);
  //   setCart(response.data.books);
  // }

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