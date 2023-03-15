import { useState, useEffect } from "react"
import cookie from "js-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import StripeCheckout from "react-stripe-checkout"
import { useAppCtx } from "../utils/AppContext"

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate()
  const [total, setTotal] = useState(0);

  const { user } = useAppCtx()

  const fetchCart = async () => {
    const response = await axios.get("/api/cart/6411f6f1d1536e3a7b7566b6");
    setCart(response.data.books);
  }

  const deleteBook = async (id) => {
    const response = await axios.delete(`/api/cart/6411f6f1d1536e3a7b7566b6/${id}`);
    setCart(response.data.books);
  }

  const calculateTotal = () => {
    let newTotal = 0;
    cart.forEach((item) => {
      newTotal += item.price;
    });
    setTotal(newTotal);
  };

  const handleToken = (token) => {
    const items = cart.map(item => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100, // convert to cents
        },
        quantity: 1,
      };
    });

    fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: items,
        email: token.email
      })
    })
    .then(res => res.json())
    .then(data => {
      window.location.href = data.url;
    })
    .catch(err => {
      console.log(err);
    })
  }


  useEffect(() => {
    fetchCart();
  }, [setCart])


  const redirectToPage = () => {
    navigate('/checkout', {replace: true}); 
  }    

  const renderCart = () => {
    return (
      <>
        <div className="container">
          <div className="row">
            <h3>Items in Cart</h3>
            {cart.map((item) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={item._id}>
                <img src={item.image} alt={item.title} />
                <h1>{item.title}</h1>
                <h2>{item.author}</h2>
                <div className="d-flex justify-content-between align-items-center">
                  <h3>${item.price}</h3>
                  <button onClick={() => deleteBook(item._id)}>delete</button>
                </div>
              </div>
            ))}
            <h4>Total: ${total}</h4>
          </div>

          { user !== undefined && (
              <div className="col-12 col-md-6">
                <StripeCheckout
                  stripeKey="pk_test_51MlE8WGRzJAVSzeYjpyutb8YPU98wyWf5kPdpaLWSZEVqM8LbSrvaUTo9iPJE4sIrOccVCyNCx8I3fmbFRyTG5qe007VuHsE3A"
                  token={handleToken}
                  amount={total * 100} // convert to cents
                  currency="USD"
                  email={props.email}
                />
              </div>
          )}
          </div>
      </>
    );
  };

  return (
    <>
      <div>
        {renderCart()}
      </div>
    </>
  )
}

export default Cart