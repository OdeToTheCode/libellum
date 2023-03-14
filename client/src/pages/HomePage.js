import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { mapToBook } from "../components/Shared";
import banner from "../assets/images/banner.jpg";



const HomePage = () => {
  const [bbooks, setBBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestSellers = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest`);
      const data = response.data;
      setBBooks(data.items.map(item => mapToBook(item)));
    };
    fetchBestSellers();
  }, []);

  const onAddToCart = (book) => {
    // setShoppingCart([...shoppingCart, book]);
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...currentCart, book]));
  }

  const viewBook = (book) => {
    console.log(`Navigating to view book page with book ${book.id}`);
    navigate('/book/' + book.id)
  }


  return (
    <main>
      <div>
      <h1 style={{"text-align": "center"}}>Browse Our Online Bookstore Selection</h1>
      </div>
      <img src={banner}></img>
      <div>
        <h2>Featured Bestsellers</h2>
        <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {bbooks.map((bbook) => (
            <div key={bbook.id} onClick={() => viewBook(bbook)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "10px", width: "150px", cursor: "pointer" }}>
              <img src={bbook.image} alt={bbook.title} style={{ maxWidth: "150px" }} />
              <h5 style={{ textAlign: "center", margin: 0 }}>{bbook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{bbook.authors}</p>
              {/* <button onClick={() => onAddToCart(bbook)} >Add to Cart</button> */}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default HomePage
