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
    setBooks(data.items);
  }

  useEffect(() => {
    fetchBook(params.isbn);
  }, []);

  return (
    <>
      <div>
      {books.map((book) => (
          <div key={book.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", width: "150px" }}>
            <p style={{ textAlign: "center", margin: 0 }}>{book.volumeInfo.title}</p>
            <p style={{ textAlign: "center", margin: 0 }}>{book.volumeInfo.authors}</p>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} style={{ maxWidth: "150px" }} />
            </div>
      ))
      }
      </div>
    </>
  );
}

export default BookPage;