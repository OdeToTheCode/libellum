import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {mapToBook} from "./Shared";




// BookSearch function and return below ---------------------------

const BookSearch = ({ bookData, setBookData }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  }

  const update = async (e) => {
    e.preventDefault();
   
// API call for Google Books - returns and maps an array to serve on the search page -----

    const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
    const data = await resp.json();
    const returnedData = data.items.map (item => mapToBook(item))
    setBookData(returnedData);
    console.log(bookData);
    redirectToPage();
  }

  const redirectToPage = () => {
    navigate('/explore'); // use history.push to redirect to another page
  }

// returned JSX for search bar functionality -------------------------------

  return (
    <div>
      <Container fluid style={{display: "flex"}}>
        <form onSubmit={update} className="mb-2" style={{width: "100%", display: "flex", "flex-direction": "row", "flex-wrap": "nowrap", "justify-content": "space-between", margin: "30px" }}>
          <div className="form-group mb-2" style={{ width: "100%"}}>
            <input
              type="text"
              className="form-control"
              name="bookSearch"
              value={search}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group searchButton">
            <button className="btn btn-primary" onClick={redirectToPage}>Search</button>
          </div>
        </form>
      </Container >
    </div>

  );
}

export default BookSearch;