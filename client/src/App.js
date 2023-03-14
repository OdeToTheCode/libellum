import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";
import { Navigation} from "./components"
import { BookPage, HomePage, SearchPage, LoginSignup, CartPage, CheckoutPage } from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/app.css"
import { useState, useEffect } from "react"



function App() {
  const [bookData, setBookData] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <AppProvider>
      <BrowserRouter>
        <Navigation bookData={bookData} setBookData={setBookData} />
        {/* <Wrapper> */}
        <div className="pt-3 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/explore" element={<SearchPage bookData={bookData} />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
        {/* </Wrapper> */}
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
