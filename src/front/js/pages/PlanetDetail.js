import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../../styles/index.scss";
import { Context } from '../store/appContext';

const urlPhoto = "https://starwars-visualguide.com/assets/img/planets/"

const PlanetDetail = () => {
    const { id } = useParams(); // Obtiene el ID de la URL
    const { store, actions } = useContext(Context);

    return (
        <div>
            {!!store.planet ? store.planet.filter((_elem, index) => index == id).map(({ name, image_url, gravity, climate }) => {
                return (
                    <div className='back_catalog' key={id}>
                        <div className="card card_detail">
                            <h1 className='text-center'>{name}</h1>
                            <img src={(urlPhoto) + image_url} className='photodetail' />
                            <p>Gravity: {gravity}</p>
                            <p>Climate: {climate}</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-dark mb-5" onClick={() => window.history.back()}>Back</button>
                        </div>
                    </div>
                )
            }) : (<div>Cargando...</div>)}
        </div>
    );
};

export default PlanetDetail;