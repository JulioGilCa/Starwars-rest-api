import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/index.scss";
import { Context } from '../store/appContext';
import jwt_decode from 'jwt-decode';

const urlPhoto = "https://starwars-visualguide.com/assets/img/characters/"

const People = () => {
    const { store, actions } = useContext(Context);
    const [token] = useState(sessionStorage.getItem("token"));
    const [idUser, setIdUser] = useState('');

    useEffect(() => {
        if (token && token !== "" && token !== "undefined") {
            const decodedToken = jwt_decode(token);
            setIdUser(decodedToken.sub);
        }
    }, [token]);

    return (
        <div>
            <h1 className='text-white text-center'>Characters</h1>
            <div className='d-flex card-container'>
                {store.people.map(({ name, image_url, gender, haircolor, eyecolor }, id) => {
                    return (
                        <div className='card_catalog' key={id}>
                            <h3 className='text-center'>{name} id:{idUser}</h3>
                            <img src={(urlPhoto) + image_url} className='photo' alt='photocharacter' />
                            <p>Gender: {gender}</p>
                            <p>Haircolor: {haircolor}</p>
                            <p>Eyecolor: {eyecolor}</p>
                            <div className='card_catalog_read_like'>
                                <Link to={`/people/${id}`}><button className='myButton'>Leer mas...</button></Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default People;
