import React from "react";

const PaystackPayment = ({ paymentMode, onPaystackModeChange }) => {
	return (
		<div
			className={`checkout-fieldset-collapse ${
				paymentMode === "paystack" ? "is-selected-payment" : ""
			}`}
		>
			<div className="checkout-field margin-0">
				<div className="checkout-checkbox-field">
					<input
						checked={paymentMode === "paystack"}
						className=""
						id="payment-paystack-checkbox"
						name="checkout_payment"
						onChange={onPaystackModeChange}
						type="radio"
					/>
					<label
						className="d-flex w-100"
						htmlFor="payment-paystack-checkbox"
					>
						<div className="d-flex-grow-1 margin-left-s">
							<h4 className="margin-0">Paystack</h4>
							<span className="text-subtle d-block margin-top-s">
								Pay easily, fast and secure with PayStack.
							</span>
						</div>
						<div className="payment-img payment-img-paystack" />
					</label>
				</div>
			</div>
		</div>
	);
};

export default PaystackPayment;
