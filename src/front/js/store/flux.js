import jwt_decode from 'jwt-decode';
import Swal from "sweetalert2";


const signupUrl = `${process.env.BACKEND_URL}/api/user`
const loginUrl = `${process.env.BACKEND_URL}/api/login`
const peopleUrl = `${process.env.BACKEND_URL}/api/people`;
const planetUrl = `${process.env.BACKEND_URL}/api/planet`;
const vehicleUrl = `${process.env.BACKEND_URL}/api/vehicle`;
const urlFavorites = `${process.env.BACKEND_URL}/api/favorites`;


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			login: [],
			token: '',
			people: [],
			planet: [],
			vehicle: [],
			favorites: [],
		},
		actions: {
			create_user: async (data) => {
				const response = await fetch(signupUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: data.email,
						username: data.username,
						password: data.password,
					}),
				});
				const jsonData = await response.json();
				return jsonData;
			},


			login: async (email, password) => {
				try {
					const response = await fetch(loginUrl, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email: email, password: password }),
					});

					if (response.ok) {
						const data = await response.json();
						sessionStorage.setItem("token", data.token);
						Swal.fire({
							icon: 'success',
							title: 'Success!',
							text: 'Login successfully!',
						});
						window.location.href = "/protected"
						return data;
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Something went wrong!',
						});
						throw new Error("Authentication failed");
					}
				} catch (error) {
					console.error("There was an error", error);
					throw error;
				}
			},

			checkToken: () => {
				const storedToken = sessionStorage.getItem("token");

				if (storedToken !== "" && storedToken !== "undefined") {
					return true;
				} else {
					return false;
				}
			},

			handleLogout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: "" });
				window.location.reload();
			},


			fetchPeople: async () => {
				try {
					const resPromise = await fetch(peopleUrl);
					if (!resPromise.ok) {
						throw new Error("Error fetching data");
					}
					const data = await resPromise.json();
					setStore({ people: data });
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			},

			fetchFavorites: async () => {
				try {
					const resPromise = await fetch(urlFavorites);
					if (!resPromise.ok) {
						throw new Error("Error fetching data");
					}
					const dataFavorites = await resPromise.json();
					setStore({ favorites: dataFavorites });
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			},


			fetchDetailPeople: async (id) => {
				setStore({ loading: true });
				const resPromise = await fetch(peopleUrl + `/${id}`);
				if (resPromise.ok) {
					const data = await resPromise.json();
					setStore({
						fetchDetailPeople: data,
						loading: false,
					});
				} else {
					console.error("Error fetching data");
					setStore({ loading: false });
				}
			},

			fetchPlanet: async () => {
				try {
					const resPromise = await fetch(planetUrl);
					if (!resPromise.ok) {
						throw new Error("Error fetching data");
					}
					const data = await resPromise.json();
					setStore({ planet: data });
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			},

			fetchDetailPlanet: async (id) => {
				setStore({ loading: true });
				const resPromise = await fetch(process.env.BACKEND_URL + `/api/planet/${id}`);
				if (resPromise.ok) {
					const data = await resPromise.json();
					setStore({
						fetchDetailPlanet: data,
						loading: false,
					});
				} else {
					console.error("Error fetching data");
					setStore({ loading: false });
				}
			},

			fetchVehicle: async () => {
				try {
					const resPromise = await fetch(process.env.BACKEND_URL + "/api/vehicle");
					if (!resPromise.ok) {
						throw new Error("Error fetching data");
					}
					const data = await resPromise.json();
					setStore({ vehicle: data });
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			},

			fetchDetailVehicle: async (id) => {
				setStore({ loading: true });
				const resPromise = await fetch(process.env.BACKEND_URL + `/api/vehicle/${id}`);
				if (resPromise.ok) {
					const data = await resPromise.json();
					setStore({
						fetchDetailVehicle: data,
						loading: false,
					});
				} else {
					console.error("Error fetching data");
					setStore({ loading: false });
				}
			},
		}
	};
};

export default getState;
