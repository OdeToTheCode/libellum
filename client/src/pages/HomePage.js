import { useState } from "react"
import { useAppCtx } from "../utils/AppContext"
import useApi from "../utils/useApi"

const HomePage = () => {
  const { user, location, setLocation } = useAppCtx()
  const { formData, setFormData } = useState(location)
  const {fetchIt, mockFetch} = useApi()
  
  const eventHandle = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setLocation(formData)
  }



  return (
    <>
      <h1>Home Page</h1>

      { !user ? (
        <p>The user is not logged in.</p>
      ) : (
        <p>The user is logged in.</p>
      )}

      <form> 
        <input type="text" placeholder={location} name="location" value={formData} onChange={(e) => setFormData(e.target.value)} style={{color:'black'}}/>
        <button type="submit" onClick={eventHandle}>Save New location</button>
      </form>
        <div>
          {location} Blah blah blah
        </div>

    </>
  )
}

export default HomePage