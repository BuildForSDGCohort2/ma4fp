import { CREATE_ORDER_SUCCESS } from "constants/constants";

export default (
	state = {
		lastRefKey: null,
		total: 0,
		items: [],
	},
	action
) => {
	switch (action.type) {
		case CREATE_ORDER_SUCCESS:
			return {
				...state,
				items: [...state.items, action.payload],
			};

		default:
			return state;
	}
};
