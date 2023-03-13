import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/search.css"
import Container from 'react-bootstrap/Container';
import defaultBookImg from "../assets/images/book.jpeg";


function randomIntFromInterval(min, max) { 
  return (Math.random() * (max - min + 1) + min).toFixed(2)
}

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
    const returnedData = data.items.map (item => {
      const rndInt = randomIntFromInterval(10, 50)
      const authors = item.volumeInfo.authors ?? [] ;
      const imageSource = item.volumeInfo.imageLinks ?? {
        thumbnail: defaultBookImg};
        console.log(item)
      return {
        id: item.id,
        title: item.volumeInfo.title,
        subtitle: item.volumeInfo.subtitle,
        authors: authors,
        description: item.volumeInfo.description,
        image: imageSource.thumbnail,
        price: `$${rndInt}`,
      }
    })
    setBookData(returnedData);
    console.log(bookData);
    redirectToPage();
  }

  const redirectToPage = () => {
    navigate('explore'); // use history.push to redirect to another page
  }

// returned JSX for search bar functionality -------------------------------

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
            <button className="btn btn-primary" onClick={redirectToPage}>Search</button>
          </div>
        </form>
      </Container >
    </div>

  );
}

export default BookSearch;