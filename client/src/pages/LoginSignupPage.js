import { useEffect, useState } from "react"
import cookie from "js-cookie"

import {CartPage, CheckoutPage} from "./index"

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'

const LoginSignup = (props) => {

  //SIGNUP LOGIC
  const signup = { email: "", password: "" }
  const [signupFormData, setSignupFormData] = useState(signup)
  const [signupResult, setSignupResult] = useState("")

  const signupInputChange = (e) => {
    setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value })
  }

  const signupFormSubmit = async (e) => {
    e.preventDefault()
    const query = await fetch("/api/user", {
      method: "post",
      body: JSON.stringify(signupFormData),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!query.ok) {
      setSignupResult("fail")
    } else {
      const result = await query.json()
      setSignupResult("success")
    }
  }


  //! LOGIN LOGIC
  const login = { email: "", password: "" }
  const [loginFormData, setLoginFormData] = useState(login)
  const [loginResult, setLoginResult] = useState("fail")

  const loginInputChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
  }

  const loginFormSubmit = async (e) => {
    console.log(loginFormData)
    e.preventDefault()
    const query = await fetch("/api/user/auth", {
      method: "post",
      body: JSON.stringify(loginFormData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await query.json()

    if (result && !result.err && result.data && result.data.token) {
      setLoginResult("success")
      cookie.set("auth-token", result.data.token, { expires: 3 })


    } else {
      setLoginResult("fail")
    }
  }


  return (
    <>
      {loginResult === "fail" && (
      <>
        <h1>Login & Signup Page</h1>
        <div class="container">
          <div class="row">
            <div class="col-6">
  
              {/* Signup Form */}
              <form className="form mb-3">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="john@gmail.com"
                    className="form-control"
                    value={signupFormData.email}
                    onChange={signupInputChange}
                  />
                </div>
  
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={signupFormData.password}
                    onChange={signupInputChange}
                  />
                </div>
  
                <div className="form-group mt-2">
                  <button className="btn btn-primary" onClick={signupFormSubmit}>Sign Me Up!</button>
                </div>
              </form>
  
              {signupResult === "success" && (
                <div className="alert alert-success" role="alert">
                  Signup successful!
                </div>
              )}
  
              {signupResult === "fail" && (
                <div className="alert alert-danger" role="alert">
                  Signup failed!
                </div>
              )}
            </div>
  
            {/* Login Form */}
            <div class="col-6">
              <form className="form mb-3">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="john@gmail.com"
                    className="form-control"
                    value={loginFormData.email}
                    onChange={loginInputChange}
                  />
                </div>
  
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={loginFormData.password}
                    onChange={loginInputChange}
                  />
                </div>
  
                <div className="form-group mt-2">
                  <button className="btn btn-primary" onClick={loginFormSubmit}>Log Me In!</button>
                </div>
              </form>
  
              {loginResult === "success" && (
                <div className="alert alert-success" role="alert">
                  Login successful!
                </div>
              )}
  
              {loginResult === "fail" && (
                <div className="alert alert-danger" role="alert">
                  Login failed!
                </div>
              )}
            </div>
          </div>
        </div>
      </>
      )}

    {loginResult === "success"  && (
      <>
      <CartPage/>
      
      </>
    )}
    </>
  )

}

export default LoginSignup