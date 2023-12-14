import React, { useState, useContext } from "react";
import { useStore } from "../store/appContext";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Catalog from "../pages/catalog";
import Swal from "sweetalert2";
import "../../styles/index.scss";

const Login = () => {
    // const { actions } = useStore(); // Usando las acciones del contexto
    const { actions } = useContext(Context);
    const token = sessionStorage.getItem("token");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await actions.login(email, password);

            if (response.token) {
                // Establecer el token en el estado global

                actions.setToken(response.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Login successfully!',
                })
                // Redireccionar o manejar el éxito según sea necesario
                window.location.href = "/protected";
            } else {
                // Manejar fallo de inicio de sesión
                Swal.fire({
                    title: "Error",
                    text: "Usuario o contraseña incorrectos",
                    icon: "error",
                });
                console.error("La autenticación falló");
                // Puedes mostrar un mensaje de error o manejarlo de la manera que desees
            }
        } catch (error) {
            console.error("Hubo un error", error);
        }
    };

    return (
        <div>
            {token && token !== "" && token !== "undefined" ? (
                <>
                    {/* Código para usuario autenticado */}
                    <div className="alert alert-success text-center" role="alert">
                        <h2>Bienvenido/a, estas en la zona StarWars</h2>
                    </div>
                    <Catalog />
                </>
            ) : (

                <div className="force-background">
                    <form className="d-flex flex-column align-items-center" onSubmit={handleOnSubmit}>
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
                        <button type="submit" className="btn btn-info">
                            Login
                        </button>
                        <Link to={"/signup"}>
                            <span className="ms-5 btn btn-success">Sign up</span>
                        </Link>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;