import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Catalog from "../pages/catalog";
import "../../styles/index.scss";


export const Profile = () => {

    const token = sessionStorage.getItem("token");

    return (
        <div>
            {token && token !== "" && token !== "undefined" ? (
                <>
                    {/* <div className="alert alert-success text-center m-0" role="alert">
                        <h2>Bienvenido/a, estas en la zona StarWars</h2>
                    </div> */}
                    <Catalog />
                </>
            ) : (
                <>
                    <div className="dark-background">
                        <h1 className="lado_oscuro">Estas en el lado oscuro</h1>
                        <h2 className="lado_oscuro_legend">No tienes permiso para acceder a esta zona</h2>
                        <div>
                            <Link to={"/login"}>
                                <button className="btn btn-success button_login_darth_vader">Vuelve a la fuerza</button>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}