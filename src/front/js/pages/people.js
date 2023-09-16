import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/index.scss";
const peopleUrl = `${process.env.BACKEND_URL}/api/people`;
const urlPhoto = "https://starwars-visualguide.com/assets/img/characters/"

const People = () => {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        // Llama a la función fetchPeople para obtener los datos de los personajes y actualiza el estado
        fetchPeople();
    }, []);

    const fetchPeople = async () => {
        try {
            const response = await fetch(peopleUrl);
            if (!response.ok) {
                throw new Error('Error al obtener datos de personajes');
            }
            const data = await response.json();
            setPeople(data); // Actualiza el estado con los datos de los personajes
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1 className='text-white text-center'>Characters</h1>
            <div className="d-flex card-container">
                {people.map((people) => (
                    <Link key={people.id} to={`/people/${people.id}`} className="card card_catalog">
                        <h3 className='text-center'>{people.name}</h3>
                        <img src={(urlPhoto) + people.image_url} className='photo' />
                        <p>Gender: {people.gender}</p>
                        <p>Haircolor: {people.haircolor}</p>
                        <p>Eyecolor: {people.eyecolor}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default People;

