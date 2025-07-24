import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export const Home = props => {
    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Why Choose Us?</h2>
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
        </Container>
    );
}
