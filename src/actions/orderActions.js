import { CREATE_ORDER, CREATE_ORDER_SUCCESS } from "constants/constants";

export const createOrder = (order) => ({
	type: CREATE_ORDER,
	payload: order,
});

export const createOrderSuccess = (order) => ({
	type: CREATE_ORDER_SUCCESS,
	payload: order,
});
