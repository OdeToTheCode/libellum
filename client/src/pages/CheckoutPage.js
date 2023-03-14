import { useState } from "react"
import cookie from "js-cookie"
// import StripeCheckout from 'react-stripe-checkout';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'

const Checkout = (props) => {

  const [cart, setCart] = useState([]); // state to store the items in the cart
  const [total, setTotal] = useState(0); // state to store the total amount of the cart

  // function to remove an item from the cart
  const removeFromCart = (item) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(newCart);
    setTotal(total - item.price);
  };

  // function to calculate the total amount of the cart
  const calculateTotal = () => {
    let newTotal = 0;
    cart.forEach((item) => {
      newTotal += item.price;
    });
    setTotal(newTotal);
  };

  // function to handle the checkout process
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

    // create a checkout session with Stripe
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
      // redirect to Stripe checkout page
      window.location.href = data.url;
    })
    .catch(err => {
      console.error(err);
      alert('An error occurred. Please try again later.');
    });
  };

  return (
    <>
      <h1>Checkout</h1>
      <div className="container">
        <div className="row">
          <div className="col-9">
            <h3>Items in Cart</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.title} - ${item.price}
                  <button onClick={() => removeFromCart(item)}>Remove</button>
                </li>
              ))}
            </ul>
            <h4>Total: ${total}</h4>
          </div>
          {/* <div className="col-3">
            <StripeCheckout
              stripeKey="-u sk_test_51MlE8WGRzJAVSzeYi0auFvieadTtZFbniBzyDwAdyBL5LzpfdzLLrTvvV9qn002AFD7dHxCgrw8FmV4VzCsrgFRk00qmhAx4v1:"
              token={handleToken}
              amount={total * 100} // convert to cents
              currency="USD"
              email={props.email}
            />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Checkout
