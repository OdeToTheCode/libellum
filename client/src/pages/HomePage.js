import { useEffect, useState, useContext } from "react"
import { BookSearch } from "../components"
import axios from "axios"




const HomePage = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBestSellers = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest`);
      const data = response.data;
      setBooks(data.items);
    };

    fetchBestSellers();
  }, []);

  const onAddToCart = (book) => {
    // setShoppingCart([...shoppingCart, book]);
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...currentCart, book]));
  }


  return (
    <>

      <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {books.map((book) => (
          <div key={book.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
            <p style={{ textAlign: "center", margin: 0 }}>{book.volumeInfo.title}</p>
            <p style={{ textAlign: "center", margin: 0 }}>{book.volumeInfo.authors}</p>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} style={{ maxWidth: "150px" }} />
            <button onClick = { ()=>onAddToCart(book)} >Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default HomePage
