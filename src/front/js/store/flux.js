const signupUrl = `${process.env.BACKEND_URL}/api/user`
const loginUrl = `${process.env.BACKEND_URL}/api/login`

const getState = ({ setStore }) => {
	return {
		store: {
			token: {}
		},
		actions: {
			create_user: data => {
				const response = fetch(signupUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				}).then(resp => resp.json());

				return response;
			},

			login: (email, password) => {
				const response = fetch(loginUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: email, password: password })
				}).then(resp => resp.json());
				return response;
			},

			setToken: token => {
				setStore({ token: token });
			}
		}
	};
};

export default getState;