import { call, put } from "redux-saga/effects";
import firebase from "firebase/firebase";

import { CREATE_ORDER, SET_REQUEST_STATUS, LOADING } from "constants/constants";
import { displayActionMessage } from "helpers/utils";

import { createOrderSuccess } from "actions/orderActions";

import { history } from "routers/AppRouter";

import { clearBasket } from "actions/basketActions";
import { resetCheckout } from "actions/checkoutActions";

import { HOME } from "constants/routes";

function* initRequest() {
	yield put({ type: LOADING, payload: true });
	yield put({ type: SET_REQUEST_STATUS, payload: null });
}

function* handleError(e) {
	yield put({ type: LOADING, payload: false });
	yield put({ type: SET_REQUEST_STATUS, payload: e });
	console.log("ERROR: ", e);
}

function* handleAction(location, message, status) {
	if (location) yield call(history.push, location);
	yield call(displayActionMessage, message, status);
}

function* orderSaga({ type, payload }) {
	switch (type) {
		case CREATE_ORDER:
			try {
				yield initRequest();
				const key = yield call(firebase.generateOrderKey);
				yield call(firebase.createOrder, key, payload);
				yield put(
					createOrderSuccess({
						id: key,
						...payload,
					})
				);
				yield put(clearBasket());
				yield put(resetCheckout());
				yield handleAction(
					HOME,
					"Order Placed Successfully :)",
					"success"
				);
				yield put({ type: LOADING, payload: false });
			} catch (e) {
				yield handleError(e);
				yield handleAction(
					undefined,
					`Your Order Failed :( ${e.message_}`,
					"error"
				);
			}
			break;

		default:
			throw new Error(`Unexpected action type ${type}`);
	}
}

export default orderSaga;
