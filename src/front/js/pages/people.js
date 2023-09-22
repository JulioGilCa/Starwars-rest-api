import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/index.scss";
const peopleUrl = `${process.env.BACKEND_URL}/api/people`;
const favoritesUrl = `${process.env.BACKEND_URL}/api/favorites/`;
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

    const handleFavoriteToggle = async (peopleId) => {
        console.log(peopleId);
        try {
            // Define el element_id que deseas marcar/desmarcar como favorito
            const elementId = peopleId; // Puedes ajustar esto según tu estructura de datos

            // Realiza una solicitud al backend para marcar/desmarcar como favorito
            const response = await fetch(favoritesUrl+`${peopleId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Asegúrate de establecer el tipo de contenido como JSON
                },
                body: JSON.stringify({ element_id: elementId }), // Envía el element_id en el cuerpo de la solicitud
            });

            if (!response.ok) {
                throw new Error('Error al actualizar favoritos');
            }

            const updatedPerson = await response.json();
            // Actualiza el estado local o la interfaz de usuario en consecuencia
            setPeople((prevPeople) =>
                prevPeople.map((people) => {
                    if (people.id === updatedPerson.id) {
                        return { ...people, favorite: updatedPeople.favorite };
                    }
                    return people;
                })
            );
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <div>
            <h1 className='text-white text-center'>Characters</h1>
            <div className='d-flex card-container'>
                {people.map((people) => (
                    <div className='card card_catalog'>
                        <h3 className='text-center'>{people.name}</h3>
                        <img src={(urlPhoto) + people.image_url} className='photo' />
                        <p>Gender: {people.gender}</p>
                        <p>Haircolor: {people.haircolor}</p>
                        <p>Eyecolor: {people.eyecolor}</p>
                        <div className='d-flex justify-content-between'>
                            <Link key={people.id} to={`/people/${people.id}`}><button>Leer mas...</button></Link>
                            <span className={`heart ${people.favorite ? 'liked' : ''}`}
                                onClick={() => handleFavoriteToggle(people.id)}>
                                <i class="fa-regular fa-heart"></i>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default People;

