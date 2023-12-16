import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/index.scss";
import { Context } from '../store/appContext';

const urlPhoto = "https://starwars-visualguide.com/assets/img/planets/"

const Planets = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <h1 className='text-white text-center'>Planets</h1>
            <div className='d-flex card-container'>
                {store.planet.map(({ name, image_url, gravity, climate }, id) => {
                    return (
                        <div className='card_catalog' key={id}>
                            <h3 className='text-center'>{name}</h3>
                            <img src={(urlPhoto) + image_url} className='photo' alt='photoplanet' />
                            <p>Gravity: {gravity}</p>
                            <p>Climate: {climate}</p>
                            <div className='card_catalog_read_like'>
                                <Link to={`/planet/${id}`}><button className='myButton'>Leer mas...</button></Link>
                                {/* Botón o ícono de corazón para marcar/desmarcar favoritos */}
                                <span
                                    onClick={() => {
                                        actions.toogleFavorite(id);
                                    }}
                                >
                                    <i className="fa-regular fa-heart"></i>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Planets;