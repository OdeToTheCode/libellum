import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { mapToBook } from "../components/Shared";
import banner from "../assets/images/banner.jpeg";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap');
</style>

const HomePage = () => {
  const [bbooks, setBBooks] = useState([])
  const [nfbbooks, setNFBBooks] = useState([])
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

  useEffect(() => {
    const fetchNFBestSellers = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:nonfiction&orderBy=newest`);
      const data = response.data;
      setNFBBooks(data.items.map(item => mapToBook(item)));
    };
    fetchNFBestSellers();
  }, []);

  const onAddToCart = (book) => {
    // setShoppingCart([...shoppingCart, book]);
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...currentCart, book]));
  }

  const viewBook = (book) => {
    console.log(`Navigating to view book page with book ${book.id}`);
    navigate('/book/' + book.id,{replace:true})
  }


  return (
    <main>
      <div>
      <h1 style={{"text-align": "center"}}>Browse Our Online Bookstore Selection</h1>
      </div>
      <img src={banner} style={{width: "100%", height:"5%"}}></img>
      <div>
        <h2 style={{"font-style": "italic"}}>Featured Bestsellers</h2>
        <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {bbooks.map((bbook) => (
            <div key={bbook.id} onClick={() => viewBook(bbook)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "10px", width: "150px", cursor: "pointer" }}>
              <img src={bbook.image} alt={bbook.title} style={{ maxWidth: "200px" }} />
              {/* <h5 style={{ textAlign: "center", margin: 0 }}>{bbook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{bbook.authors}</p> */}
              {/* <button onClick={() => onAddToCart(bbook)} >Add to Cart</button> */}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{"font-style": "italic"}}>Featured Non-Fiction Bestsellers</h2>
        <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {nfbbooks.map((nfbbook) => (
            <div key={nfbbook.id} onClick={() => viewBook(nfbbook)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "10px", width: "150px", cursor: "pointer" }}>
              <img src={nfbbook.image} alt={nfbbook.title} style={{ maxWidth: "200px" }} />
              {/* <h5 style={{ textAlign: "center", margin: 0 }}>{nfbbook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{nfbbook.authors}</p> */}
              {/* <button onClick={() => onAddToCart(bbook)} >Add to Cart</button> */}
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}

export default HomePage
