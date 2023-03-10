import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";
import { Header, Wrapper } from "./components"
import { HomePage, SearchPage, LoginSignup } from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/app.css"

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles/global.css'

function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        {/* <Wrapper> */}
          <div className="pt-3 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/expolore" element={<SearchPage />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </div>
        {/* </Wrapper> */}
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
