// App.js
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import MainComponent from "./pages/MainComponent";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Signup from "./pages/SignUp/index";
import { GoogleOAuthProvider } from '@react-oauth/google';
import useAuth from "./middlewares/useAuth";
import { SignIn } from "./pages/SignIn";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const isAuthenticated = useAuth();

  return (
    <GoogleOAuthProvider clientId="191570489931-j27lojkfomhcrh0bd8kov53irk2quc08.apps.googleusercontent.com">
      <div className="App">
        <Header />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/signin" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
            </>
          )}
          <Route path="/*" element={<MainComponent />} />
        </Routes>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
