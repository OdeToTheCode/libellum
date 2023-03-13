import { useState, useEffect } from "react"
import axios from "axios"

//  const indBook = {
//   id: item.id,
//   title: item.volumeInfo.title,
//   subtitle: item.volumeInfo.subtitle,
//   authors: authors,
//   description: item.volumeInfo.description,
//   image: imageSource.thumbnail,
//   price: `$${rndInt}`,
//   }


const BookPage = () => {

  const bookID= 9781630260439;

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      const fetchBook = async (bookID) => {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookID}`);
        const data = response.data;
        setBooks(data.items);
        console.log(data)
      }
      
      fetchBook();
    }, []);

  return (
    <>
    <div></div>
    </>
  );
}

export default BookPage;