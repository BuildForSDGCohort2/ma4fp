import React from "react";

import logo from "../../../static/logo_horizontal_white.png";
import instagram from "../../../static/instagram.png";
import facebook from "../../../static/facebook.png";
import twitter from "../../../static/twitter.png";

import * as ROUTE from "constants/routes";

const Footer = ({ path }) => {
	// hide the footer to these routes
	const hiddenPaths = [
		ROUTE.SIGNIN,
		ROUTE.SIGNUP,
		ROUTE.FORGOT_PASSWORD,
		ROUTE.ACCOUNT,
		ROUTE.ACCOUNT_EDIT,
		ROUTE.CHECKOUT_STEP_1,
		ROUTE.CHECKOUT_STEP_2,
		ROUTE.CHECKOUT_STEP_3,
	];

	return hiddenPaths.includes(path) ? null : (
		<footer className="footer">
			<div className="footer-cols container">
				<div className="footer-col-1">
					<img
						src={logo}
						alt="farmdepo logo"
						className="footer-logo"
					/>
				</div>
				<div className="footer-col-2">
					<p>SOCIALS</p>
					<div className="social-icons">
						<img src={instagram} alt="farmdepo instagram" />
						<img src={facebook} alt="farmdepo facebook" />
						<img src={twitter} alt="farmdepo twitter" />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
