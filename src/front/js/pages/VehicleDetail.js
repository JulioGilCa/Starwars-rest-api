import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/index.scss";
import { Context } from '../store/appContext';

const urlPhoto = "https://starwars-visualguide.com/assets/img/vehicles/"

const VehicleDetail = () => {
    const { id } = useParams();
    const { store } = useContext(Context);


    return (
        <>
            {!!store.vehicle ? store.vehicle.filter((_elem, index) => index == id).map(({ name, image_url, manufacturer, length, passengers }) => {
                return (
                    <div className='back_catalog' key={id}>
                        <div className="card card_detail">
                            <h1 className='text-center'>{name}</h1>
                            <img src={(urlPhoto) + image_url} className='photoDetail' />
                            <p>Manufacturer: {manufacturer}</p>
                            <p>Length: {length}</p>
                            <p>Passengers: {passengers}</p>
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

export default VehicleDetail;


// <div>
//     {token && token !== "" && token !== "undefined" ? (
//         <>
//             <div className='back_catalog'>
//                 <div className="card card_detail">
//                     <h1 className='text-center'>{vehicle.name}</h1>
//                     <img src={(urlPhoto) + vehicle.image_url} className='photoDetail' />
//                     <p>Manufacturer: {vehicle.manufacturer}</p>
//                     <p>Length: {vehicle.length}</p>
//                     <p>Passengers: {vehicle.passengers}</p>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                     <button className="btn btn-dark mb-5" onClick={() => window.history.back()}>Back</button>
//                 </div>
//             </div>
//         </>
//     ) : (
//         <>
//             <div className="dark-background">
//                 <h1 className="lado_oscuro">Estas en el lado oscuro</h1>
//                 <h2 className="lado_oscuro_legend">No tienes permiso para acceder a esta zona</h2>
//                 <div className="button_position">
//                     <Link to={"/login"}>
//                         <button className="btn btn-success button_login_darth_vader">Vuelve a la fuerza</button>
//                     </Link>
//                 </div>
//             </div>
//         </>
//     )}
// </div>