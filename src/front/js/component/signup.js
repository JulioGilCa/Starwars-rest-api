import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/index.scss";
import Catalog from "../pages/catalog";

const signupUrl = `${process.env.BACKEND_URL}/api/user`


const Signup = () => {
    const { actions } = useContext(Context);
    const [data, setData] = useState({
        email: "",
        username: "",
        password: ""
    });

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const submitForm = async event => {
        event.preventDefault();

        if (!data.email || !data.username || !data.password) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios.",
                icon: "error",
            });
            return;
        };

        try {
            const result = await actions.create_user(data);

            if (result.created === true || result.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User registered successfully!, please login.',
                }).then(() => {
                    navigate.push("/login");
                });
            } else if (result.created === false || result.status === 400) {
                Swal.fire({
                    title: "Error",
                    text: "El usuario ya existe.",
                    icon: "error",
                });
            } else {
                console.log(data); // Handle the response as needed
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {token && token !== "" && token !== "undefined" ? (
                <>
                    <div className="alert alert-success text-center" role="alert">
                        <h2>Bienvenido/a, estas en la zona StarWars</h2>
                    </div>
                    <Catalog />
                </>
            ) : (
                <div className="force-background">
                    <form className="d-flex flex-column align-items-center" onSubmit={submitForm}>
                        <h1 className="text-center col-3 mb-3 fs-1 my-5 border border-warning p-4 text-white">Sign In</h1>
                        <div className="mb-3 col-3 border border-warning p-3">
                            <input
                                type="email"
                                className="form-control mb-3"
                                name="email"
                                id="emailInput"
                                placeholder="email"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                className="form-control mb-3"
                                name="username"
                                id="usernameInput"
                                placeholder="username"
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                className="form-control mb-3"
                                name="password"
                                id="passwordInput"
                                placeholder="Password"
                                onChange={handleInputChange}
                            />
                            <div className="text-center">
                                <button type="submit" className="btn btn-info mb-3">
                                    Save
                                </button>

                                <Link to={"/login"}>
                                    <span className="ms-5 btn btn-success mb-3">Login</span>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Signup;