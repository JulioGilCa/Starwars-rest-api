import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";

import { Home } from "./pages/home";
import { Profile } from "./pages/protected";
import PeopleDetail from './pages/PeopleDetail';
import PlanetDetail from './pages/PlanetDetail';
import VehicleDetail from './pages/VehicleDetail';

import Login from "./component/login";
import Signup from "./component/signup";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import ScrollToTop from "./component/scrollToTop";


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
                        <Route path="/people/:id" element={<PeopleDetail />} />
                        <Route path="/planet/:id" element={<PlanetDetail />} />
                        <Route path="/vehicle/:id" element={<VehicleDetail />} />
                        <Route path="*" element={<h1>Page not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
