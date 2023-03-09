import React from "react";
import { useState } from "react";


const BookSearch = () => {
  const [bookData, setBookData] = useState([]);
  const [search, setSearch] = useState("");
  
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  }

  const update = async (e) => {
    e.preventDefault();
    const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
    const data = await resp.json();
    setBookData(data.items);
    console.log(bookData);
  }
  

  return (
    <div>
      <h1>Book Search</h1>
      <form onSubmit={update} className="mb-2">
          <div className="form-group mb-2">
            <label>Search</label>
            <input 
              type="text" 
              className="form-control" 
              name="bookSearch" 
              value={search} 
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Search</button>
          </div>
      </form>
      {(bookData.length !== 0) && (<p>{bookData[0].volumeInfo.title}</p>)}
      {(bookData.length !== 0) && (<p>{bookData[0].volumeInfo.subtitle}</p>)}
      {(bookData.length !== 0) && (<p>{bookData[0].volumeInfo.authors[0]}</p>)}
      {(bookData.length !== 0) && (<p>{bookData[0].searchInfo.textSnippet}</p>)}
      {(bookData.length !== 0) && (<img src={bookData[0].volumeInfo.imageLinks.thumbnail}/>)}
    </div>
    // </div>
    
  );
}

export default BookSearch;