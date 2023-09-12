const signupUrl = `${process.env.BACKEND_URL}/api/user`
const loginUrl = `${process.env.BACKEND_URL}/api/login`

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: {},
			people: [],
		},
		actions: {
			create_user: async (data) => {
				const response = await fetch(signupUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});
				const jsonData = await response.json();
				return jsonData;
			},


			login: async (email, password) => {
				const response = await fetch(loginUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email, password: password })
				});
				const jsonData = await response.json();
				return jsonData;
			},

			setToken: token => {
				setStore({ token: token });
			},

			fetchPeople: async () => {
				try {
					const resPromise = await fetch(process.env.BACKEND_URL + "/api/people");
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
				const resPromise = await fetch(process.env.BACKEND_URL + `/api/people/${id}`);
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
					const resPromise = await fetch(process.env.BACKEND_URL + "/api/planet");
					if (!resPromise.ok) {
						throw new Error("Error fetching data");
					}
					const data = await resPromise.json();
					setStore({ planet: data });
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			},

		}
	};
};

export default getState;