import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../../styles/index.scss";
const urlPhoto = "https://starwars-visualguide.com/assets/img/planets/"

const PlanetDetail = () => {
    const { id } = useParams(); // Obtiene el ID de la URL
    const [planet, setPlanet] = useState(null);

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        // Realiza una solicitud para obtener los detalles de la persona por su ID
        fetchPlanetDetails(id);
    }, [id]);

    const fetchPlanetDetails = async (id) => {
        try {
            // Realiza una solicitud para obtener los detalles de la persona por su ID
            const response = await fetch(`${process.env.BACKEND_URL}/api/planet/${id}`);
            if (!response.ok) {
                throw new Error('Error al obtener detalles del planeta');
            }
            const data = await response.json();
            setPlanet(data); // Actualiza el estado con los detalles de la persona
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!planet) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div>
            {token && token !== "" && token !== "undefined" ? (
                <>
                    <div className='back_catalog'>
                        <div className="card card_detail">
                            <h1 className='text-center'>{planet.name}</h1>
                            <img src={(urlPhoto) + planet.image_url} className='photodetail' />
                            <p>Gravity: {planet.gravity}</p>
                            <p>Climate: {planet.climate}</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-dark mb-5" onClick={() => window.history.back()}>Back</button>
                        </div>
                    </div>
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
    );
};

export default PlanetDetail;
