import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Catalog from "../pages/catalog";
import "../../styles/index.scss";


export const Profile = () => {

    const token = sessionStorage.getItem("token");
    const accessUrl = "https://images.squarespace-cdn.com/content/v1/5ec11e7c3afc284131735f05/1619780776861-HDVMTO6YI43FFRIQNYP6/Si.png"


    return (
        <div>
            {token && token !== "" && token !== "undefined" ? (
                <>
                    <div className="alert alert-success text-center" role="alert">
                        <h2>Bienvenido/a, estas en la zona StarWars</h2>
                    </div>
                    {/* <div className="d-flex flex-column align-items-center">
                        <img src={accessUrl} alt="access" width={400} />
                    </div> */}
                    <Catalog />
                </>
            ) : (
                <>
                    <div className="dark-background">
                        <h1 className="lado_oscuro">Estas en el lado oscuro</h1>
                        <h2 className="lado_oscuro_legend">No tienes permiso para acceder a esta zona</h2>
                        <div className="button_position">
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