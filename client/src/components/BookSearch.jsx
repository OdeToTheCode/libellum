import React from "react";
import { useState } from "react";
import "../assets/css/search.css"
import Container from 'react-bootstrap/Container';


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
      <Container fluid className="searchBar">
        <form onSubmit={update} className="mb-2 searchEl">
          <div className="form-group mb-2 searchText">
            <input
              type="text"
              className="form-control"
              name="bookSearch"
              value={search}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group searchButton">
            <button className="btn btn-primary">Search</button>
          </div>
        </form>
      </Container >
    </div>

  );
}

export default BookSearch;