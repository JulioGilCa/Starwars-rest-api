import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

export const Navbar = () => {
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setToken('');
		window.location.reload();
	};

	const [token, setToken] = useState(sessionStorage.getItem("token"));

	useEffect(() => {
		if (token && token !== "" && token !== "undefined") {
			try {
				const decodedToken = jwt_decode(token);
				if (decodedToken) {

				} else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'User not found in token!',
					});
				}
			} catch (error) {
				console.error('Error decoding token:', error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'An error occurred while decoding token!',
				});
			}
		}
	}, [token]);
	return (
		<nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand">StarWars Api Rest</span>
				</Link>
				<div className="ml-auto">
					{token && token !== "" && token !== "undefined" ? (

						<button onClick={handleLogout} className="btn btn-danger">Logout</button>

					) : (<p> </p>
					)}
				</div>
			</div>
		</nav>
	);
};