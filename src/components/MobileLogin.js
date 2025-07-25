import React, { useState } from "react";
import {
	Card,
	Form,
	Button,
	Row,
	Col
} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import BackendApi from './BackendApi';
import { useAuth } from "../AuthContext";

const HARDCODED_PAN = "F";

export default function MobileLogin() {

	const history = useHistory();

	const [mobile, setMobile] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const context = useAuth();



	const handleLogin = async () => {
		if (mobile.length !== 10) {
			setError("Please enter a valid 10-digit mobile number.");
			return;
		}

		const expectedPassword = mobile.slice(-4) + HARDCODED_PAN;

		if (password === expectedPassword) {
			context.setLoggedIn(true);
			setError("");

			context.setMobileNumber(mobile);
			const formData = {
				mobile,
				password
			};

			const submissionData = new FormData();
			Object.keys(formData).forEach(key => {
				submissionData.append(key, formData[key]);
			});


			const response = await BackendApi.login(submissionData);
			if (response.status === "not_found") {
				context.setLoggedIn(false);
				console.log("not found")
				setError("You are not registered, Please apply")

			} else {
				history.push('/status', { response });
				context.setUserName(response.name);
			}


		} else {
			setError("Invalid password.");
		}
	};

	return (
		<div className="container mt-5">
			<Row className="justify-content-center">
				<Col md={6}>
					<Card className="p-4 shadow">
						<Card.Title className="text-center mb-3">
							Login
						</Card.Title>

						{!context.loggedIn ? (
							<Form>
								<Form.Group className="mb-3">
									<Form.Label>Mobile Number</Form.Label>
									<Form.Control
										type="tel"
										placeholder="Enter 10-digit mobile number"
										value={mobile}
										onChange={(e) => setMobile(e.target.value)}
										maxLength={10}
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>
										Password
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Form.Group>

								{error && <div className="text-danger mb-3">{error}</div>}

								<Button variant="primary" onClick={handleLogin} className="w-100">
									Login
								</Button>
							</Form>
						) : (
							<div className="text-center my-5">
								<div className="d-flex justify-content-center">
									<div className="spinner-border text-success" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								</div>
								<p className="mt-3">Logging you in...</p>
							</div>
						)}
					</Card>
				</Col>
			</Row>
		</div>
	);
}
