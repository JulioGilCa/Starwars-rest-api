import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/index.scss";
import { Context } from '../store/appContext';
import jwt_decode from 'jwt-decode';

const urlPhoto = "https://starwars-visualguide.com/assets/img/planets/"

const Planets = () => {
    const { store, actions } = useContext(Context);
    const [token] = useState(sessionStorage.getItem("token"));
    const [idUser, setIdUser] = useState('');

    useEffect(() => {
        if (token && token !== "" && token !== "undefined") {
            const decodedToken = jwt_decode(token);
            setIdUser(decodedToken.sub);
            actions.fetchPlanet();
            actions.fetchFavorites();
        }
    }, [token]);

    const toggleFavorite = async (card_id) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/${card_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ group_id: 2 })
            });

            if (response.ok) {
                actions.fetchPlanet();
                actions.fetchFavorites();
            } else {
                console.error('Failed to toggle favorite');
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
        <div>
            <h1 className='text-white text-center'>Planets</h1>
            <div className='xcards'>
                {store.planet.map(({ name, image_url, gravity, climate }, id) => {
                    const isFavorite = store.favorites.some(favorite => favorite.card_id === id && favorite.user_id === idUser && favorite.group_id === 2);
                    const cardClasses = `xcard ${isFavorite ? 'favorite' : ''}`;
                    return (
                        <div className={cardClasses} key={id}>
                            <div className='face front'>
                                <img src={(urlPhoto) + image_url} alt='photoplanet' />
                                <h3>{name}</h3>
                            </div>
                            <div className='face back'>
                                <p>Gravity: {gravity}</p>
                                <p>Climate: {climate}</p>
                                <div className='card_catalog_read_like'>
                                    <Link to={`/planet/${id}`}><button className='myButton'>Leer mas...</button></Link>
                                    <i className={`fas fa-heart ${isFavorite ? 'liked' : 'like-off'}`} onClick={() => toggleFavorite(id)}></i>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Planets;