import { useState, useEffect } from "react"
import "../assets/css/explore.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {mapToBook, displayAuthors} from "../components/Shared";


const SearchPage = ({ bookData }) => {

  const [books, setBooks] = useState([])
  const [nfbooks, setNFBooks] = useState([])
  const [abooks, setABooks] = useState([])
  const [rbooks, setRBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiction = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction`);
      const data = response.data;
      setBooks(data.items.map(item => mapToBook(item)));
    };
    fetchFiction();
  }, []);

  useEffect(() => {
    const fetchNonfiction = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:nonfiction`);
      const data = response.data;
      setNFBooks(data.items.map(item => mapToBook(item)));
    };
    fetchNonfiction();
  }, []);

  useEffect(() => {
    const fetchAction = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:action`);
      const data = response.data;
      setABooks(data.items.map(item => mapToBook(item)));
    };
    fetchAction();
  }, []);

  useEffect(() => {
    const fetchRomance = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:romance`);
      const data = response.data;
      setRBooks(data.items.map(item => mapToBook(item)));
    };
    fetchRomance();
  }, []);

  const addToCart = (book) => {
    console.log(`Navigating to cart with book ${book.id}`);
  }

const viewBook = (book) => {
    console.log(`Navigating to view book page with book ${book.id}`);
    navigate('/book/'+book.id,{replace:true})
  }

  return (
    <section>
      {bookData.length > 0 ? <h1>Search Results</h1> : ""}
      {bookData.map(book => {
        return (
          <div className="searchFlex">
            <div className="topSearchFlex">
              <div className="infoFlex">
                <div key={book.id} onClick={() =>viewBook(book)} style={{cursor:"pointer"}}>
                  <div><h2>{book.title}</h2></div>
                  <div><h4>{book.subtitle}</h4></div>
                  <img src={book.image} alt="book cover art" />
                </div>
              </div>
              <div className="priceSearchFlex">
                <div>{book.price}</div>
                <button onClick={()=>addToCart(book)}>Add to Cart</button>
              </div>

            </div>
            <div className="bottomSearchFlex">
              <div className="authorFlex">
                <h3 >Written By: &nbsp;&nbsp;&nbsp;</h3>
                <div >{displayAuthors(book)}
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
      <div style={{"margin-top": "30px"}}>
        <h2 style={{"font-style": "italic"}}>Explore Fiction</h2>
        <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {books.map((fbook) => (
            <div key={fbook.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
              <img src={fbook.image} alt={fbook.title} style={{ maxWidth: "150px", cursor:"pointer" }} onClick={() =>viewBook(fbook)}/>
              {/* <h5 style={{ textAlign: "center", margin: 0 }}>{fbook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{fbook.authors}</p> */}
            </div>
          ))}
        </div>
        <hr></hr>
      </div>

      <div style={{"margin-top": "30px"}}>
        <h2 style={{"font-style": "italic"}}>Explore Romance</h2>
        <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {rbooks.map((rbook) => (
            <div key={rbook.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
              <img src={rbook.image} alt={rbook.title} style={{ maxWidth: "150px", cursor:"pointer" }} onClick={() =>viewBook(rbook)} />
              {/* <h5 style={{ textAlign: "center", margin: 0 }}>{rbook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{rbook.authors}</p> */}
            </div>
          ))}
        </div>
        <hr></hr>
      </div>

      <div style={{"margin-top": "30px"}}>
        <h2 style={{"font-style": "italic"}}>Explore Non-Fiction</h2>
        <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {nfbooks.map((nfbook) => (
            <div key={nfbook.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
              <img src={nfbook.image} alt={nfbook.title} style={{ maxWidth: "150px", cursor:"pointer" }} onClick={() =>viewBook(nfbook)} />
              {/* <h5 style={{ textAlign: "center", margin: 0 }}>{nfbook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{nfbook.authors}</p> */}
            </div>
          ))}
        </div>
        <hr></hr>
      </div>

      <div style={{"margin-top": "30px"}}>
        <h2 style={{"font-style": "italic"}}>Explore Action</h2>
        <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {abooks.map((abook) => (
            <div key={abook.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
              <img src={abook.image} alt={abook.title} style={{ maxWidth: "150px", cursor:"pointer" }} onClick={() =>viewBook(abook)} />
              {/* <h5 style={{ textAlign: "center", margin: 0 }}>{abook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{abook.authors}</p> */}
            </div>
          ))}
        </div>
        <hr></hr>
      </div>

    </section>

  )
}



export default SearchPage