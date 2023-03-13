import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from 'react-router';
import { mapToBook, displayAuthors } from "../components/Shared";



const BookPage = () => {

  const params = useParams()
  const [book, setBook] = useState([])

  const fetchBook = async (bookID) => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookID}`);
    const data = response.data;
    console.log(data)
    setBook(mapToBook(data));
  }

  const addToCart = (book) => {
    console.log(`Navigating to cart with book ${book.isbn}`);

  }

  useEffect(() => {
    fetchBook(params.isbn);
  }, []);

  return (
    <div>
      {/* {books.map((book) => ( */}
      <div>
        <div key={book.id} style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", width: "90%" }}>
          <img src={book.largeImg} alt={book.title} style={{ maxWidth: "350px" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            <h1 style={{ textAlign: "center", margin: 0 }}>{book.title}</h1>
            <h2 style={{ textAlign: "center", margin: 0 }}>{book.subtitle}</h2>
            <p style={{ textAlign: "left", margin: 0 }}>{book.price}</p>
            <button onClick={()=>addToCart(book)}>Add to Cart</button>
          </div>

          </div>
            <h3 style={{ textAlign: "left", margin: 0 }}>Written By:&nbsp;&nbsp;{displayAuthors(book)}</h3>
            <p style={{ textAlign: "left", margin: 0 }}>
              <span dangerouslySetInnerHTML={{__html:book.description}}></span></p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.language}</p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.maturity}</p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.pageCount} pages</p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.pubDate}</p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.publisher}</p>
            <p style={{ textAlign: "left", margin: 0 }}>Categories: {book.categories}</p>
            <p style={{ textAlign: "left", margin: 0 }}>ISBN: {book.isbn}</p>
            </div>
        </div>


      );
}

      export default BookPage;