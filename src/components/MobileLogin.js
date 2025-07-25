import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { useHistory } from 'react-router-dom';
import BackendApi from './BackendApi';
import { useAuth } from "../AuthContext";

const HARDCODED_PAN = "ABCDE1234F";

export default function MobileLogin() {

  const history = useHistory();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loggedIn, setLoggedIn, setUserName } = useAuth();


  const handleLogin = async () => {
    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const expectedPassword = mobile.slice(-4) + HARDCODED_PAN;

    if (password === expectedPassword) {
      setLoggedIn(true);
      setError("");
      setUserName(mobile);

      const formData = {
        mobile,
        password
      };

      const submissionData = new FormData();
      Object.keys(formData).forEach(key => {
        submissionData.append(key, formData[key]);
      });


      const response = await BackendApi.login(submissionData);

      history.push('/status', { response });

    } else {
      setError("Invalid password.");
    }
  };

  const handleLogout = () => {
    setMobile("");
    setPassword("");
    setLoggedIn(false);
    setError("");
    setUserName("")
  };

  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <Card.Title className="text-center mb-3">
              Login with Mobile & Password
            </Card.Title>

            {!loggedIn ? (
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
                    Password{" "}
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip>
                          Password = last 4 digits of mobile + PAN ({HARDCODED_PAN})
                        </Tooltip>
                      }
                    >
                      <span>
                        <BsInfoCircle
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                        />
                      </span>
                    </OverlayTrigger>
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
