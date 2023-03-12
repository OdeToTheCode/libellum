import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppContext"
import useApi from "../utils/useApi"
import { BookSearch, Navigation } from "../components"


const SearchPage = ({ bookData }) => {

  return (
    <>


      <section>
        {bookData.map(book => {
          return (
            <div key={book.id}>
              <div>{book.title}</div>
              <div>{book.subtitle}</div>
              <div>{book.authors.map(author => {
                return (
                  <div key={author}>
                    <div>{author}</div>
                  </div>
                )
              })}
              </div>
              <div>{book.description}</div>
              <img src={book.image} />
              <div>{book.price}</div>
            </div>
          )
        })}

      </section>
    </>
  )
}

export default SearchPage