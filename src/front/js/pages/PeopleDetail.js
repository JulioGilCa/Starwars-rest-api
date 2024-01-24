import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../../styles/index.scss";
import { Context } from '../store/appContext';

const urlPhoto = "https://starwars-visualguide.com/assets/img/characters/"

const PeopleDetail = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const token = sessionStorage.getItem("token");

    return (
        <>
            {!!store.people ? store.people.filter((_elem, index) => index == id).map(({ name, image_url, gender, haircolor, eyecolor }) => {
                return (
                    <div className='back_catalog' key={id}>
                        <div className="card card_detail">
                            <h1 className='text-center'>{name}</h1>
                            <img src={(urlPhoto) + image_url} className='photodetail' />
                            <p>Gender: {gender}</p>
                            <p>Haircolor: {haircolor}</p>
                            <p>Eyecolor: {eyecolor}</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-dark mb-5" onClick={() => window.history.back()}>Back</button>
                        </div>
                    </div>
                )
            }) : (<div>Cargando...</div>)}
        </>
    );
};

export default PeopleDetail;