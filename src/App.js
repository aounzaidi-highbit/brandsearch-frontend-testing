import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "../src/Middleware/ProtectedRoutes/ProtectedRoutes";
// import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import MainComponent from "./pages/MainComponent";
import { useEffect } from "react";
import Aos from "aos";
import ClickScrollToTop from "./components/common/scrollToTop";
import "aos/dist/aos.css";
import NoData from "./components/noData/noData";
import About from "./pages/About/About";
import Signup from "./pages/SignUp/index";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <GoogleOAuthProvider clientId="191570489931-j27lojkfomhcrh0bd8kov53irk2quc08.apps.googleusercontent.com">
      <div className="App">
        <ClickScrollToTop />
        <Header />
        <Routes>
          {localStorage.getItem("userIsLoggedIn") ? null : (
            // <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          )}
          <Route>
            <Route path="/*" element={<MainComponent />} />
            {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
          </Route>
        </Routes>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
