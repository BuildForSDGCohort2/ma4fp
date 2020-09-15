import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { CHECKOUT_STEP_2 } from "constants/routes";
import useDocumentTitle from "hooks/useDocumentTitle";
import { setPaymentDetails } from "actions/checkoutActions";
import { createOrder } from "actions/orderActions";
import { displayMoney, displayActionMessage } from "helpers/utils";
import StepTracker from "../components/StepTracker";
import Pagination from "../components/Pagination";
import PaystackPayment from "./PaystackPayment";
import withAuth from "../hoc/withAuth";
import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";

const Payment = ({ shipping, payment, subtotal, dispatch, history }) => {
	useDocumentTitle("Check Out Final Step | FarmDepo");

	const basket = useSelector((state) => state.basket);
	const auth = useSelector((state) => state.auth);

	const paystackAmount =
		(subtotal + (shipping.isInternational ? 50 : 0)) * 100;

	const config = {
		reference: new Date().getTime(),
		email: shipping.email,
		amount: paystackAmount,
		publicKey: "pk_test_b051e260bfa1d06aa5fd2f36d38f9a4183c0a50d",
	};

	const initializePayment = usePaystackPayment(config);

	const [paymentMode, setPaymentMode] = useState(payment.type || "paystack");

	const onPaystackModeChange = () => {
		setPaymentMode("paystack");
	};

	const savePaymentDetails = () => {
		const isChanged =
			Object.keys(field).some(
				(key) => field[key].value !== payment.data[key]
			) || paymentMode !== payment.type;

		if (isChanged) {
			dispatch(
				setPaymentDetails({
					type: paymentMode,
					data: {
						type: paymentMode,
						name: field.name.value,
						cardnumber: field.cardnumber.value,
						expiry: field.expiry.value,
						ccv: field.ccv.value,
					},
				})
			);
		}
	};

	const onConfirm = (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-extra-boolean-cast

		if (!paymentMode) return;
		if (paymentMode === "credit") {
			if (noError) {
				displayActionMessage("Feature not ready yet :)", "info");
				// TODO: fire only if changed
				savePaymentDetails();
				// Do some action here. :)
			} else {
				displayActionMessage(
					"All credentials for credit payment required!",
					"error"
				);
			}
		} else if (paymentMode === "paystack") {
			initializePayment((res) => {
				if (res.status === "success") {
					let orderedProducts = [];
					for (const product of basket) {
						orderedProducts.push({
							id: product.id,
							quantity: product.quantity,
						});
					}

					// Remove irrelevant data
					const {
						isDone,
						isInternational,
						...cleanShipping
					} = shipping;

					const order = {
						userId: auth.id,
						products: orderedProducts,
						orderDate: new Date().getTime(),
						shipping: {
							...cleanShipping,
						},
					};

					dispatch(createOrder(order));
				} else {
				}
			});
		} else {
			displayActionMessage("Feature not ready yet :)", "info");
		}
	};

	const onClickBack = () => {
		savePaymentDetails();
		history.push(CHECKOUT_STEP_2);
	};

	return !shipping.isDone ? (
		<Redirect to="/checkout/step1" />
	) : (
		<div className="checkout">
			<StepTracker current={3} />
			<div className="checkout-step-3">
				<PaystackPayment
					onPaystackModeChange={onPaystackModeChange}
					paymentMode={paymentMode}
				/>
				<br />
				<div className="basket-total text-right">
					<p className="basket-total-title">Total:</p>
					<h2 className="basket-total-amount">
						{displayMoney(
							subtotal + (shipping.isInternational ? 50 : 0)
						)}
					</h2>
				</div>
				<br />
				<Pagination
					// eslint-disable-next-line no-extra-boolean-cast
					disabledNext={!!!paymentMode}
					history={history}
					nextStepLabel="Confirm"
					onClickNext={onConfirm}
					onClickPrevious={onClickBack}
				/>
			</div>
		</div>
	);
};

export default withAuth(Payment);
