import React, { createContext, useContext, useEffect, useState } from "react"
import cookie from "js-cookie"

export const AppContext = createContext({})
export const useAppCtx = () => useContext(AppContext)

export const AppProvider = ({children}) => {
  const [ user, setUser ] = useState(null)
  const [ location, setLocation ] = useState("Minnesota")

  const verifyUser = async () => {
    const authCookie = cookie.get("auth-token")
    if( authCookie ){
      const query = await fetch("/api/user/verify", {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": authCookie
        }
      })
      const result = await query.json()
      if( result ){
        setUser(result)
      }
    }
  }

  useEffect(() => {
    verifyUser()
  },[user])

  return (
    <AppContext.Provider value={{ user, setUser, location, setLocation }}>
      {children}
    </AppContext.Provider>
  )
}