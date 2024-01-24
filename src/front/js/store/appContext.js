import React, { createContext, useContext, useState, useEffect } from "react";
import getState from "./flux.js";


export const Context = createContext();

export const usePeopleContext = () => useContext(Context)

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			state.actions.fetchPeople()
			state.actions.fetchPlanet()
			state.actions.fetchVehicle()
		}, []);

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;