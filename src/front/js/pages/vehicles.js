import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/index.scss";

const vehiclesUrl = `${process.env.BACKEND_URL}/api/vehicle`;
const urlPhoto = "https://starwars-visualguide.com/assets/img/vehicles/"

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        // Llama a la función fetchPeople para obtener los datos de los personajes y actualiza el estado
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await fetch(vehiclesUrl);
            if (!response.ok) {
                throw new Error('Error al obtener datos de personajes');
            }
            const data = await response.json();
            setVehicles(data); // Actualiza el estado con los datos de los personajes
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1 className='text-white text-center'>Vehicles</h1>
            <div className="d-flex card-container">
                {vehicles.map((vehicles) => (
                    <Link key={vehicles.id} to={`/vehicle/${vehicles.id}`} className="card card_catalog">
                        <h3 className='text-center'>{vehicles.name}</h3>
                        <img src={(urlPhoto) + vehicles.image_url} className='photo' />
                        <p>Manufacturer: {vehicles.manufacturer}</p>
                        <p>Length: {vehicles.length}</p>
                        <p>Passengers: {vehicles.passengers}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Vehicles;

