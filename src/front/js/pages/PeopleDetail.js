import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../../styles/index.scss";
const urlPhoto = "https://starwars-visualguide.com/assets/img/characters/"

const PeopleDetail = () => {
    const { id } = useParams(); // Obtiene el ID de la URL
    const [people, setPeople] = useState(null);

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        // Realiza una solicitud para obtener los detalles de la persona por su ID
        fetchPeopleDetails(id);
    }, [id]);

    const fetchPeopleDetails = async (id) => {
        try {
            // Realiza una solicitud para obtener los detalles de la persona por su ID
            const response = await fetch(`${process.env.BACKEND_URL}/api/people/${id}`);
            if (!response.ok) {
                throw new Error('Error al obtener detalles de la persona');
            }
            const data = await response.json();
            setPeople(data); // Actualiza el estado con los detalles de la persona
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!people) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div>
            {token && token !== "" && token !== "undefined" ? (
                <>
                    <div className='back_catalog'>
                        <div className="card card_detail">
                            <h1 className='text-center'>{people.name}</h1>
                            <img src={(urlPhoto) + people.image_url} className='photodetail' />
                            <p>Gender: {people.gender}</p>
                            <p>Haircolor: {people.haircolor}</p>
                            <p>Eyecolor: {people.eyecolor}</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-dark mb-5" onClick={() => window.history.back()}>Back</button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="dark-background">
                        <h1 className="lado_oscuro">Estas en el lado oscuro</h1>
                        <h2 className="lado_oscuro_legend">No tienes permiso para acceder a esta zona</h2>
                        <div className="button_position">
                            <Link to={"/login"}>
                                <button className="btn btn-success button_login_darth_vader">Vuelve a la fuerza</button>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PeopleDetail;
