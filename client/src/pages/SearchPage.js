import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppContext"
import useApi from "../utils/useApi"
import { BookSearch, Navigation } from "../components"


const SearchPage = ({ bookData} ) => {
  const [ bookDataSearch, setBookDataSearch ] = useState([])
  useEffect(() => {
    setBookDataSearch(bookData)
    console.log(bookDataSearch)
  },[bookData])

  return (
    <>


      <div>
          {(bookDataSearch.length !== 0) && (<p>{bookDataSearch[0].volumeInfo.title}</p>)}
          {(bookDataSearch.length !== 0) && (<p>{bookDataSearch[0].volumeInfo.subtitle}</p>)}
          {(bookDataSearch.length !== 0) && (<p>{bookDataSearch[0].volumeInfo.authors[0]}</p>)}
          {(bookDataSearch.length !== 0) && (<p>{bookDataSearch[0].searchInfo.textSnippet}</p>)}
          {(bookDataSearch.length !== 0) && (<img src={bookDataSearch[0].volumeInfo.imageLinks.thumbnail} />)}
        </div>
    </>
  )
}

export default SearchPage