import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";
import { Header, Navigation, Wrapper } from "./components"
import { HomePage, SearchPage, LoginSignup } from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/app.css"
import { useState, useEffect } from "react"

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles/global.css'

function App() {
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    
  },[bookData])

  return (
    <AppProvider>
      <BrowserRouter>
        <Navigation bookData={bookData} setBookData={setBookData}/>
        {/* <Wrapper> */}
          <div className="pt-3 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/explore" element={<SearchPage bookData={bookData} setBookData={setBookData}/>} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </div>
        {/* </Wrapper> */}
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
