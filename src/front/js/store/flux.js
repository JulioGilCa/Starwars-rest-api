const signupUrl = `${process.env.BACKEND_URL}/api/user`
const loginUrl = `${process.env.BACKEND_URL}/api/login`
const peopleUrl = `${process.env.BACKEND_URL}/api/people`;
const planetUrl = `${process.env.BACKEND_URL}/api/planet`;
const urlFavorites = `${process.env.BACKEND_URL}/api/favorites`;

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: {},
			people: [],
			planet: [],
			vehicle: [],
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
						// Almacena el token en el estado global
						setStore({ token: data.token });
						return data;
					} else {
						throw new Error("Authentication failed");
					}
				} catch (error) {
					console.error("There was an error", error);
					throw error; // Lanza el error para que pueda ser manejado por el componente
				}
			},

			setToken: token => {
				setStore({ token: token });
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

			fetchUserFavorites: async () => {
				try {
					const response = await fetch(`${urlFavorites}/${idUser}`);
					if (!response.ok) {
						throw new Error('Error al obtener favoritos del usuario');
					}
					const data = await response.json();
					// Almacena los ID de los favoritos del usuario en el estado
					setUserFavorites(data.map(favorite => favorite.people_id));
					// Agrega aquí otros campos (planet_id, vehicle_id) según tus necesidades
				} catch (error) {
					console.error('Error:', error);
				}
			},

			toggleFavorite: async (elementId) => {
				try {
					const response = await fetch(`${urlFavorites}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							user_id: idUser,
							people_id: elementId,
							planet_id: elementId,
							vehicle_id: elementId
						}),
					});

					if (!response.ok) {
						throw new Error('Error al actualizar favoritos del usuario');
					}

					// Actualiza la lista de favoritos del usuario después de la modificación
					fetchUserFavorites();
				} catch (error) {
					console.error('Error:', error);
				}
			},
		}
	};
};

export default getState;