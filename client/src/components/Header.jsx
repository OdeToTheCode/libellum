import React from "react";
import { useEffect } from "react";
import { useState } from "react";


const BookSearch = () => {
  const [bookData, setBookData] = useState([]);
  const [current, setCurrent] = useState([])
  const [search, setSearch] = useState("");
  
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  }

  const update = async (e) => {
    e.preventDefault();
    const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
    const data = await resp.json();
    setCurrent(data.items);
  }

  useEffect(() => {
    setBookData(current)
  }, [search])

  

  return (
    <header className="px-2 pb-0 mb-0" style={{ borderBottom: "1px solid #333" }}>
      <nav className="navbar navbar-dark navbar-expand-md bg-body-secondary" data-bs-theme="dark">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="##">Navbar</a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              { !user ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">Signup</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/profile">Profile</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout">Logout</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/dashboard">{location}</a>
                  </li>
                </>
              )}
              {/* test */}
            </ul>

          </div>
          <div className="form-group">
            <button className="btn btn-primary">Search</button>
          </div>
      </form>
      {(bookData !== []) && (<p>{bookData[0].id}</p>)}
    </div>
    
  );
}

export default BookSearch;