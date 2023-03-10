import { useState } from "react"
import { useAppCtx } from "../utils/AppContext"
import useApi from "../utils/useApi"
import { BookSearch, Navigation } from "../components"
import { SearchPage } from "../pages"


const HomePage = () => {


  return (
    <>
      {/* < Navigation /> */}
      {/* < BookSearch /> */}
      <SearchPage />

    </>
  )
}

export default HomePage