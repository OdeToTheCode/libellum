import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";
import { Header, Navigation, Wrapper } from "./components"
import { BookPage, HomePage, SearchPage, LoginSignup, CartPage, CheckoutPage } from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/app.css"
import { useState, useEffect } from "react"
import axios from "axios"

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles/global.css'

function App() {
  const [bookData, setBookData] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);


  //   const FetchBookData = async () => {  
  //     useEffect(async () => {
  //       const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
  //       const data = response.data;
  //       setBookData(data.items);
  //       console.log(bookData);


  //     // fetchBookData();
  //   }, []);
  // }


  // const [search, setSearch] = useState("");

  // these may need to be added into the navigation route as a prop
  // fetchBook={FetchBookData} search={search} setSearch={setSearch}

  return (
    <AppProvider>
      <BrowserRouter>
        <Navigation bookData={bookData} setBookData={setBookData} />
        {/* <Wrapper> */}
        <div className="pt-3 px-4">
          <Routes>
            <Route path="login" element={<LoginSignup />} />
            <Route path="explore" element={<SearchPage bookData={bookData} />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="book/:isbn" element={<BookPage />} />
            <Route path="" element={<HomePage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
        {/* </Wrapper> */}
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
