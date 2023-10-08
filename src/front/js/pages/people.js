import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/index.scss";
const peopleUrl = `${process.env.BACKEND_URL}/api/people`;
const favoritesUrl = `${process.env.BACKEND_URL}/api/favorites/`;
const urlPhoto = "https://starwars-visualguide.com/assets/img/characters/"

const People = () => {
    const [people, setPeople] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isFavorite, setIsFavorite] = useState({}); // Usar un objeto para rastrear el estado de "liked" de cada personaje
    const user_id = 2; // El usuario actual es el usuario 1

    useEffect(() => {
        // Llama a la función fetchPeople para obtener los datos de los personajes y actualiza el estado
        fetchPeople();
    }, []);

    useEffect(() => {
        // Llama a la función fetchFavorites para obtener los personajes favoritos del usuario
        fetchFavorites();
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

    const fetchFavorites = async () => {
        try {
            // Llama a la API para obtener los personajes favoritos del usuario actual
            const response = await fetch(`${favoritesUrl}${user_id}`);
            if (!response.ok) {
                throw new Error('Error al obtener datos de favoritos');
            }
            const data = await response.json();
            const favoriteMap = {};
            data.forEach((favorite) => {
                favoriteMap[favorite.people_id] = true;
            });
            setIsFavorite(favoriteMap);
            setFavorites(data); // Actualiza el estado con los personajes favoritos
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleButtonClick = async ({ user_id, people_id }) => {
        try {
            // Verifica si el personaje ya está en la lista de favoritos del usuario
            if (isFavorite[people_id]) {
                // Si ya está en favoritos, quítalo
                const response = await fetch(`${favoritesUrl}${user_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ element_id: people_id }),
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar de favoritos');
                }
                // Actualiza el estado local o la interfaz de usuario en consecuencia
                setIsFavorite((prevState) => ({
                    ...prevState,
                    [people_id]: false,
                }));
            } else {
                // Si no está en favoritos, agrégalo
                const response = await fetch(`${favoritesUrl}${user_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ element_id: people_id }),
                });
                if (!response.ok) {
                    throw new Error('Error al agregar a favoritos');
                }
                // Actualiza el estado local o la interfaz de usuario en consecuencia
                setIsFavorite((prevState) => ({
                    ...prevState,
                    [people_id]: true,
                }));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1 className='text-white text-center'>Characters</h1>
            <div className='d-flex card-container'>
                {people.map((people) => (
                    <div className='card_catalog' key={people.id}>
                        <h3 className='text-center'>{people.name}</h3>
                        <img src={(urlPhoto) + people.image_url} className='photo' alt='photocharacter' />
                        <p>Gender: {people.gender}</p>
                        <p>Haircolor: {people.haircolor}</p>
                        <p>Eyecolor: {people.eyecolor}</p>
                        <div className='card_catalog_read_like'>
                            <Link to={`/people/${people.id}`}><button className='myButton'>Leer mas...</button></Link>
                            <span
                                className={`heart ${isFavorite[people.id] ? 'liked' : ''}`}
                                onClick={() => handleButtonClick({ user_id: user_id, people_id: people.id })}>
                                <i className="fa-solid fa-heart"></i>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default People;
