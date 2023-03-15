import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useResolvedPath } from "react-router-dom";
import { mapToBook, displayAuthors } from "../components/Shared";
import { Container, Row, Col } from "react-bootstrap";
import { useAppCtx } from "../utils/AppContext";

const SearchPage = ({ bookData }) => {
  const { user } = useAppCtx();
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
    console.log(user)
    if (!user) {
      navigate('/login', { replace: true })
    }
    //need to add the book to the user's cart
    return axios.post(`/api/cart/${user._id}`, { book })
      .then(res => {
        console.log(res);
        console.log(res.data);
      }),
      navigate('/cart/', { replace: true })

  }

  const viewBook = (book) => {
    console.log(`Navigating to view book page with book ${book.id}`);
    navigate('/book/' + book.id, { replace: true })
  }

  return (
    <Container fluid>
      <section>
        {bookData.length > 0 ? <h1>Search Results</h1> : ""}
        {bookData.map(book => {
          return (
            <Container>
              <Row>
                <Col md={2}>
                  <div key={book.id} onClick={() => viewBook(book)} style={{ cursor: "pointer" }}>
                    <img src={book.image} alt="book cover art" />
                  </div>
                </Col>
                <Col md={6}>
                  <div><h2>{book.title}</h2></div>
                  <div><h4>{book.subtitle}</h4></div>
                </Col>
                <Col md={4}>
                  <div style={{color: "white"}}>{book.price}</div>
                  <button onClick={() => addToCart(book)}>Add to Cart</button>
                </Col>
                <div style={{ display: "flex", "flex-direction": "column" }}>
                  <div style={{ display: "flex", "flex-direction": "row" }}>
                    <h3 >Written By: &nbsp;&nbsp;&nbsp;</h3>
                    <div >{displayAuthors(book)}
                    </div>
                  </div>
                  <div style={{color: 'white'}}>{book.description}</div>
                </div>
                <div style={{ margin: "30px" }}>
                  <hr></hr>
                </div>
              </Row>
            </Container>
          )
        })}
        <div style={{ "margin-top": "30px" }}>
          <h2 style={{ "font-style": "italic" }}>Explore Fiction</h2>
          <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {books.map((fbook) => (
              <div key={fbook.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
                <img src={fbook.image} alt={fbook.title} style={{ maxWidth: "150px", cursor: "pointer" }} onClick={() => viewBook(fbook)} />
                {/* <h5 style={{ textAlign: "center", margin: 0 }}>{fbook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{fbook.authors}</p> */}
              </div>
            ))}
          </div>
          <hr></hr>
        </div>

        <div style={{ "margin-top": "30px" }}>
          <h2 style={{ "font-style": "italic" }}>Explore Romance</h2>
          <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {rbooks.map((rbook) => (
              <div key={rbook.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
                <img src={rbook.image} alt={rbook.title} style={{ maxWidth: "150px", cursor: "pointer" }} onClick={() => viewBook(rbook)} />
                {/* <h5 style={{ textAlign: "center", margin: 0 }}>{rbook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{rbook.authors}</p> */}
              </div>
            ))}
          </div>
          <hr></hr>
        </div>

        <div style={{ "margin-top": "30px" }}>
          <h2 style={{ "font-style": "italic" }}>Explore Non-Fiction</h2>
          <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {nfbooks.map((nfbook) => (
              <div key={nfbook.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
                <img src={nfbook.image} alt={nfbook.title} style={{ maxWidth: "150px", cursor: "pointer" }} onClick={() => viewBook(nfbook)} />
                {/* <h5 style={{ textAlign: "center", margin: 0 }}>{nfbook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{nfbook.authors}</p> */}
              </div>
            ))}
          </div>
          <hr></hr>
        </div>

        <div style={{ "margin-top": "30px" }}>
          <h2 style={{ "font-style": "italic" }}>Explore Action</h2>
          <div style={{ display: "flex", flexDirection: "row", overflowY: "hidden", minWidth: "100%" }}>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {abooks.map((abook) => (
              <div key={abook.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
                <img src={abook.image} alt={abook.title} style={{ maxWidth: "150px", cursor: "pointer" }} onClick={() => viewBook(abook)} />
                {/* <h5 style={{ textAlign: "center", margin: 0 }}>{abook.title}</h5>
              <p style={{ textAlign: "center", margin: 0 }}>{abook.authors}</p> */}
              </div>
            ))}
          </div>
          <hr></hr>
        </div>

      </section>
    </Container>
  )
}



export default SearchPage