import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/index.scss";

const planetsUrl = `${process.env.BACKEND_URL}/api/planet`;
const urlPhoto = "https://starwars-visualguide.com/assets/img/planets/"

const Planets = () => {
    const [planet, setPlanet] = useState([]);

    useEffect(() => {
        // Llama a la función fetchPeople para obtener los datos de los personajes y actualiza el estado
        fetchPlanets();
    }, []);

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
            <h1 className='text-center text-white'>Planets</h1>
            <div className="d-flex card-container">
                {planet.map((planet) => (
                    <Link key={planet.id} to={`/planet/${planet.id}`} className="card card_catalog">
                        <h3 className='text-center'>{planet.name}</h3>
                        <img src={(urlPhoto) + planet.image_url} className='photo' />
                        <p>Gravity: {planet.gravity}</p>
                        <p>Climate: {planet.climate}</p>
                        {/* Agrega más campos según la estructura de tus datos */}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Planets;