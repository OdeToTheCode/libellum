import { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router';


const BookPage = () => {

  const params= useParams()
  const [books, setBooks] = useState([])

  const fetchBook = async (bookID) => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookID}`);
    const data = response.data;
    console.log(data)
    setBooks(data.items);
  }

  useEffect(() => {
    fetchBook(params.isbn);
  }, []);

  return (
    <>
      <div>
      {books.map((book) => (
        <div>
          <div key={book.id} style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", width: "90%" }}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} style={{ maxWidth: "150px" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            <h1 style={{ textAlign: "center", margin: 0 }}>{book.volumeInfo.title}</h1>
            <h2 style={{ textAlign: "center", margin: 0 }}>{book.volumeInfo.subtitle}</h2>
            </div>
            
            
            </div>
            <p style={{ textAlign: "left", margin: 0 }}>{book.volumeInfo.authors}</p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.volumeInfo.description}</p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.volumeInfo.language}</p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.volumeInfo.maturityRating}</p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.volumeInfo.pageCount}</p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.volumeInfo.publishedDate}</p>
            <p style={{ textAlign: "left", margin: 0 }}>{book.volumeInfo.publisher}</p>
            <p style={{ textAlign: "left", margin: 0 }}>Categories: {book.volumeInfo.categories}</p>
            <p style={{ textAlign: "left", margin: 0 }}>ISBN: {book.volumeInfo.industryIdentifiers[0].identifier}</p>
            </div>
      ))
      }
      </div>
    </>
  );
}

export default BookPage;