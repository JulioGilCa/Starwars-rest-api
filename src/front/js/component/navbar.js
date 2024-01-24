import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import "../../styles/index.scss";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [token, setToken] = useState(sessionStorage.getItem("token"));
	const [nameUser, setNameUser] = useState('');
	const [idUser, setIdUser] = useState('');

	useEffect(() => {
		if (token && token !== "" && token !== "undefined") {
			try {
				const decodedToken = jwt_decode(token);
				if (decodedToken && decodedToken.username) {
					setNameUser(decodedToken.username);
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
	}, [token]);

	return (
		<nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
			<div className="container">
				<Link className="title_page" to="/">
					<span>StarWars Api Rest</span>
				</Link>
				<div className="ml-auto">
					{token && token !== "" && token !== "undefined" ? (
						<div>
							<span className="text-white mr-2">Hola {nameUser}</span>
							<button onClick={actions.handleLogout} className="btn btn-danger mx-3">Logout</button>
						</div>
					) : (
						<p> </p>
					)}
				</div>
			</div>
		</nav>
	);
};