import { useState, useEffect } from "react"
// import { useAppCtx } from "../utils/AppContext"
// import useApi from "../utils/useApi"
// import { BookSearch, Navigation } from "../components"
import "../assets/css/explore.css"
import axios from "axios"



const SearchPage = ({ bookData }) => {

  const [books, setBooks] = useState([])
  const [nfbooks, setNFBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFiction = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction`);
      const data = response.data;
      setBooks(data.items);
    };

    fetchFiction();
  }, []);

  useEffect(() => {
    const fetchNonfiction = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:nonfiction`);
      const data = response.data;
      setNFBooks(data.items);
    };

    fetchNonfiction();
  }, []);


  return (
    <section>
      {bookData.length > 0 ? <h1>Search Results</h1> : ""}
      {bookData.map(book => {
        return (
          <div className="searchFlex">
            <div className="topSearchFlex">
              <div className="infoFlex">
                <div key={book.id}>
                  <div><h2>{book.title}</h2></div>
                  <div><h4>{book.subtitle}</h4></div>
                  <img src={book.image} alt="book cover art" />
                </div>
              </div>
              <div className="priceSearchFlex">
                <div>{book.price}</div>
                <button>Add to Cart</button>
              </div>

            </div>
            <div className="bottomSearchFlex">
              <div className="authorFlex">
                <h3 >Written By&nbsp;&nbsp;&nbsp;</h3>
                <div className="authorFlex">{book.authors.map(author => {
                  return (
                    <div key={author}>
                      <div><h3>&bull;{author}&nbsp;&nbsp;&nbsp;</h3></div>
                    </div>
                  )
                })}
                </div>
              </div>
              <div>{book.description}</div>
            </div>
            <div id="divide">
              <hr></hr>
            </div>
          </div>
        )
      })}
      <div>
        <h2>Explore Fiction</h2>
        <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {books.map((fbook) => (
            <div key={fbook.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
              <img src={fbook.volumeInfo.imageLinks.thumbnail} alt={fbook.volumeInfo.title} style={{ maxWidth: "150px" }} />
              <h5 style={{ textAlign: "center", margin: 0 }}>{fbook.volumeInfo.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{fbook.volumeInfo.authors}</p>
              
              {/* <button onClick = { ()=>onAddToCart(book)} >Add to Cart</button> */}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Explore Non-Fiction</h2>
        <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {nfbooks.map((nfbook) => (
            <div key={nfbook.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
              <img src={nfbook.volumeInfo.imageLinks.thumbnail} alt={nfbook.volumeInfo.title} style={{ maxWidth: "150px" }} />
              <h5 style={{ textAlign: "center", margin: 0 }}>{nfbook.volumeInfo.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{nfbook.volumeInfo.authors}</p>
              
              {/* <button onClick = { ()=>onAddToCart(book)} >Add to Cart</button> */}
            </div>
          ))}
        </div>
      </div>

    </section>

  )
}



export default SearchPage