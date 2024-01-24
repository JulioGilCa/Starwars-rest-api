import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Catalog from "../pages/catalog";
import "../../styles/index.scss";

const Login = () => {
    const { store, actions } = useContext(Context);
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await actions.login(email, password);
        } catch (error) {
            console.error("There was an error", error);
        }
    };

    return (
        <div>
            {token && token !== "" && token !== "undefined" ? (
                <Catalog />
            ) : (
                <div className="force-background">
                    <form className="d-flex flex-column align-items-center" onSubmit={handleOnSubmit}>
                        <h1 className="text-center col-3 mb-3 fs-1 my-5 border border-success p-4 text-white">Login</h1>
                        <div className="mb-3 col-3 border border-success p-3">
                            <input
                                className="form-control mb-3"
                                id="emailInput"
                                onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" placeholder="Enter email"
                            />
                            <input
                                className="form-control mb-3"
                                id="passwordInput"
                                onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="Password"
                            />
                            <div className="text-center">
                                <button type="submit" className="btn btn-info">
                                    Enter
                                </button>
                                <Link to={"/signup"}>
                                    <span className="ms-5 btn btn-success">Sign up</span>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )
            }
        </div >
    );
};
export default Login;