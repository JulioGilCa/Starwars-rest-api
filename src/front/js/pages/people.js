import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import "../../styles/index.scss";
const peopleUrl = `${process.env.BACKEND_URL}/api/people`;
const urlFavorites = `${process.env.BACKEND_URL}/api/favorites`;
const urlPhoto = "https://starwars-visualguide.com/assets/img/characters/"

const People = () => {
    const [people, setPeople] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [idUser, setIdUser] = useState('');


    useEffect(() => {
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
        fetchPeople();      // Llama a la función fetchPeople para obtener los datos de los personajes y actualiza el estado
    }, [token]);

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

    const fetchUserFavorites = async (user_id) => {
        try {
            // Obtén los favoritos del usuario desde el backend
            const response = await fetch(`${urlFavorites}/${idUser}`); // Reemplaza userId con el ID del usuario actual
            if (!response.ok) {
                throw new Error('Error al obtener favoritos del usuario');
            }
            const data = await response.json();
            // Almacena los ID de los favoritos del usuario en el estado
            setUserFavorites(data.map(favorite => favorite.element_id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleFavorite = async (elementId) => {
        try {
            // Envía la solicitud para agregar o quitar el elemento de favoritos
            const response = await fetch(`${urlFavorites}/${idUser}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ element_id: elementId }),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Error al actualizar favoritos del usuario');
            }
            // Actualiza la lista de favoritos del usuario después de la modificación
            fetchUserFavorites();
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
                            <Link to={`/people/${people.id}`}><button className='myButton'>{idUser} Leer mas...</button></Link>
                            {/* Botón o ícono de corazón para marcar/desmarcar favoritos */}
                            <span
                                className={`heart ${userFavorites.includes(people.id) ? "selected" : ""}`}
                                onClick={() => toggleFavorite(people.id)}
                            >
                                ❤️
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default People;
