import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Catalog from "../pages/catalog";
import Swal from "sweetalert2";
import "../../styles/index.scss";

const loginUrl = `${process.env.BACKEND_URL}/api/login`

const Login = () => {
    const [email, setEmail] = useState(""); // Define el estado del correo electrónico
    const [password, setPassword] = useState(""); // Define el estado de la contraseña
    const token = sessionStorage.getItem("token");

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            }),

            setToken: token => {
                setStore({ token: token });
            }
        }

        fetch(loginUrl, opts)
            .then(resp => {
                if (resp.status === 200 || resp.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Login successfully!',
                    })
                    return resp.json();
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Usuario o contraseña incorrectos",
                        icon: "error",
                    });
                    throw new Error("Authentication failed");
                }
            })
            .then(data => {
                console.log(data);
                const accessToken = data.token;

                // Almacena el token en sessionStorage
                sessionStorage.setItem("token", accessToken);
                window.location.href = "/protected";
            })
            .catch(error => {
                console.error("There was an error", error);
            });
    };

    return (
        <div>
            {token && token !== "" && token !== "undefined" ? (
                <>
                    <Catalog />
                </>
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
            )}
        </div>
    );
};
export default Login;