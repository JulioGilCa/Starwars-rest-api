import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import jwt_decode from 'jwt-decode';
import "../../styles/index.scss";

const urlPhoto = "https://starwars-visualguide.com/assets/img/characters/"

const People = () => {
    const { store, actions } = useContext(Context);
    const [token] = useState(sessionStorage.getItem("token"));
    const [idUser, setIdUser] = useState('');

    useEffect(() => {
        if (token && token !== "" && token !== "undefined") {
            const decodedToken = jwt_decode(token);
            setIdUser(decodedToken.sub);
            actions.fetchPeople();
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
                body: JSON.stringify({ group_id: 1 })
            });

            if (response.ok) {
                actions.fetchPeople();
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
            <h1 className='text-white text-center'>Characters</h1>
            <div className='xcards'>
                {store.people.map(({ name, image_url, gender, haircolor, eyecolor }, id) => {
                    const isFavorite = store.favorites.some(favorite => favorite.card_id === id && favorite.user_id === idUser && favorite.group_id === 1);
                    const cardClasses = `xcard ${isFavorite ? 'favorite' : ''}`;
                    return (
                        <div className={cardClasses} key={id}>
                            <div className='face front'>
                                <img src={(urlPhoto) + image_url} alt='photoCharacter' />
                                <h3>{name}</h3>
                            </div>
                            <div className='face back'>
                                <p>Gender: {gender}</p>
                                <p>Haircolor: {haircolor}</p>
                                <p>Eyecolor: {eyecolor}</p>
                                <div className='card_catalog_read_like'>
                                    <Link to={`/people/${id}`}><button className='myButton'>Leer mas...</button></Link>
                                    <i className={`fas fa-heart ${isFavorite ? 'liked' : 'like-off'}`} onClick={() => toggleFavorite(id)}></i>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div >
        </div >
    );
};

export default People;
