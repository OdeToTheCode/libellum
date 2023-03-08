import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";
import { Header, Wrapper } from "./components"
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'

function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Wrapper>
          <Header />
          <div className="pt-3 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </div>
        </Wrapper>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
