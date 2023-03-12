// import { useState, useEffect } from "react"
// import { useAppCtx } from "../utils/AppContext"
// import useApi from "../utils/useApi"
// import { BookSearch, Navigation } from "../components"
import "../assets/css/explore.css"


const SearchPage = ({ bookData }) => {

  return (
    <section>
      {bookData.length>0 ? <h1>Search Results</h1> : ""}
      {bookData.map(book => {
        return (
          <div className="searchFlex">
            <div className="topSearchFlex">
              <div className="infoFlex">
                <div key={book.id}>
                  <div><h2>{book.title}</h2></div>
                  <div><h4>{book.subtitle}</h4></div>
                  <img src={book.image} alt="book cover art" />
                </div>
              </div>
              <div className="priceSearchFlex">
                <div>{book.price}</div>
                <button>Add to Cart</button>
              </div>

            </div>
            <div className="bottomSearchFlex">
              <div className="authorFlex">
                <h3 >Written By&nbsp;&nbsp;&nbsp;</h3>
                <div className="authorFlex">{book.authors.map(author => {
                  return (
                    <div key={author}>
                      <div><h3>&bull;{author}&nbsp;&nbsp;&nbsp;</h3></div>
                    </div>
                  )
                })}
                </div>
              </div>
              <div>{book.description}</div>
            </div>
            <div id="divide">
              <hr></hr>
            </div>
          </div>
        )
      })}

    </section>

  )
}

export default SearchPage