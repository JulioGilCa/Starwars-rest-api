import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import "../../styles/index.scss";

const planetsUrl = `${process.env.BACKEND_URL}/api/planet`;
const urlFavorites = `${process.env.BACKEND_URL}/api/favorites`;
const urlPhoto = "https://starwars-visualguide.com/assets/img/planets/"

const Planets = () => {
    const [planet, setPlanet] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [idUser, setIdUser] = useState('');


    useEffect(() => {
        // Llama a la función fetchPeople para obtener los datos de los personajes y actualiza el estado
        if (token && token !== "" && token !== "undefined") {
            try {
                const decodedToken = jwt_decode(token);
                if (decodedToken && decodedToken.username) {
                    setIdUser(decodedToken.sub);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "User not found in token!",
                    });
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error occurred while decoding token!",
                });
            }
        }
        fetchPlanets();
    }, [token]);

    const fetchPlanets = async () => {
        try {
            const response = await fetch(planetsUrl);
            if (!response.ok) {
                throw new Error('Error al obtener datos de personajes');
            }
            const data = await response.json();
            setPlanet(data); // Actualiza el estado con los datos de los personajes
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1 className='text-white text-center'>Characters</h1>
            <div className='d-flex card-container'>
                {planet.map((planet) => (
                    <div className='card_catalog' key={planet.id}>
                        <h3 className='text-center'>{planet.name}</h3>
                        <img src={(urlPhoto) + planet.image_url} className='photo' alt='photoplanet' />
                        <p>Gravity: {planet.gravity}</p>
                        <p>Climate: {planet.climate}</p>
                        <div className='card_catalog_read_like'>
                            <Link to={`/planet/${planet.id}`}><button className='myButton'>Leer mas...</button></Link>
                            {/* Botón o ícono de corazón para marcar/desmarcar favoritos */}
                            <span
                                className={userFavorites.includes(planet.id) ? "heart-icon selected" : "heart-icon"}
                                onClick={() => toggleFavorite(planet.id)}
                            >
                                ❤️
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // return (
    //     <div>
    //         <h1 className='text-center text-white'>Planets</h1>
    //         <div className="d-flex card-container">
    //             {planet.map((planet) => (
    //                 <Link key={planet.id} to={`/planet/${planet.id}`} className="card card_catalog">
    //                     <h3 className='text-center'>{planet.name}</h3>
    //                     <img src={(urlPhoto) + planet.image_url} className='photo' />
    //                     <p>Gravity: {planet.gravity}</p>
    //                     <p>Climate: {planet.climate}</p>
    //                     {/* Agrega más campos según la estructura de tus datos */}
    //                 </Link>
    //             ))}
    //         </div>
    //     </div>
    // );
};

export default Planets;