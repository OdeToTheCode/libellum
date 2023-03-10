import { useEffect, useState } from "react"
import { BookSearch } from "../components"
import axios from "axios"


// here we are going to create a search bar that will allow the user to search for books
// we will also create a button that will allow the user to add the book to their library
// we will also create content to populate the page with the books that the user has added to their library
//we will also create a button that will allow the user to delete the book from their library
//we will also hit the api to populate the page with best sellers
//we will also create a button that will allow the user to add the book to their library
const HomePage = () => {
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState([])
  const [library, setLibrary] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setBooks(data.items)
          setError('')
        } else {
          setError('No books found')
        }
        setLoading(false)
      })
  }

  const handleAdd = (book) => {
    setLibrary([...library, book])
  }

  const handleDelete = (book) => {
    setLibrary(library.filter(b => b.id !== book.id))
  }

  const handleBestSellers = () => {
    setLoading(true)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=best+sellers`)
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setBestSellers(data.items)
          setError('')
        } else {
          setError('No books found')
        }
        setLoading(false)
      })
  }

  useEffect(() => {
    const fetchBestSellers = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest`);
      const data = response.data;
      setBooks(data.items);
    };

    fetchBestSellers();
  }, []);


  return (
    <>
      < BookSearch />
      <div> 

        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {books.map(book => (
          <div key={book.id}>
            <p>{book.volumeInfo.title}</p>
            <button onClick={() => handleAdd(book)}>Add</button>
          </div>
          ))}

        {library.map(book => (
          <div key={book.id}>
            <p>{book.volumeInfo.title}</p>
            <button onClick={() => handleDelete(book)}>Delete</button>
          </div>))}

        {bestSellers.map(book => (
          <div key={book.id}>
            <p>{book.volumeInfo.title}</p>
            <button onClick={() => handleAdd(book)}>Add</button>
          </div>    
        ))}

      </div>
    </>
  )
}

export default HomePage