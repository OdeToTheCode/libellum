import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppContext"
import useApi from "../utils/useApi"
import { BookSearch, Navigation } from "../components"


const SearchPage = ({ bookData} ) => {

  return (
    <>


      <div>
          {(bookData.length !== 0) && (<p>{bookData[0].volumeInfo.title}</p>)}
          {(bookData.length !== 0) && (<p>{bookData[0].volumeInfo.subtitle}</p>)}
          {(bookData.length !== 0) && (<p>{bookData[0].volumeInfo.authors[0]}</p>)}
          {(bookData.length !== 0) && (<p>{bookData[0].searchInfo.textSnippet}</p>)}
          {(bookData.length !== 0) && (<img src={bookData[0].volumeInfo.imageLinks.thumbnail} />)}
        </div>
    </>
  )
}

export default SearchPage