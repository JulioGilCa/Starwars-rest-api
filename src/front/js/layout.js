import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Login from "./component/login";
import Signup from "./component/signup";
import { Profile } from "./pages/protected";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/protected" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/single/:theid" element={<Single />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
