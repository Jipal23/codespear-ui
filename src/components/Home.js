// src/components/Home.js
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';


export default function Home(props) {


    const history = useHistory();

    const handleApplyClick = () => {
        history.push('/form');
    };



    return (
        <div style={{padding: "60px 0" }}>
            <Container>
                {/* Company Introduction */}
                <Row className="mb-5 text-center">
                    <Col>
                        <h2 className="mb-3">Who We Are</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
                            At <strong>VendorLoans</strong>, we specialize in providing fast and flexible financial support
                            to small vendors, shopkeepers, and micro-entrepreneurs. Our mission is to empower local businesses
                            with access to capital so they can grow and thrive in their communities.
                        </p>
                    </Col>
                </Row>

                {/* Feature Title */}
                <Row className="mb-4 text-center">
                    <Col>
                        <h3>Why Choose Us?</h3>
                    </Col>
                </Row>

                {/* Features */}
                <Row className="text-center">
                    <Col md={4} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <Card.Title>Instant Approval</Card.Title>
                                <Card.Text>
                                    Get approved within 24 hours with minimum documentation.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <Card.Title>Low Interest Rates</Card.Title>
                                <Card.Text>
                                    Affordable repayment options tailored to small businesses.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <Card.Title>Flexible Terms</Card.Title>
                                <Card.Text>
                                    Choose a repayment plan that works for your business cycle.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        <Button size='lg' onClick={handleApplyClick}>
                            Apply Now
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

