import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';

import { useLocation } from 'react-router-dom';

// EMI calculator
const calculateEMI = (principal, rate, tenureInYears) => {
    const tenureInMonths = tenureInYears * 12;                    // Convert years to months
    const monthlyRate = rate / (12 * 100);                        // Monthly interest rate in decimal
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
        (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
    return emi.toFixed(0);
};

export const ApplicationStatus = () => {

    const location = useLocation();
    const response = location.state?.response;

    if (!response) {
        return <Container><Card className="p-4 shadow"><p className="text-danger">No application data found.</p></Card></Container>
    }

    // ✅ Approved View
    const renderApproved = () => {
        const emi = calculateEMI(response.creditLimit, response.interestRate, response.tenure);

        return (
            <Card className="p-4 mt-4 shadow">
                <h2 className="text-success mb-3">🎉 Application Approved!</h2>
                <Row className="mb-3">
                    <Col><strong>Credit Limit:</strong> ₹{response.creditLimit}</Col>
                    <Col><strong>Interest Rate:</strong> {response.interestRate}%</Col>
                    <Col><strong>Tenure:</strong> {response.tenure} Year</Col>
                </Row>
                <h5>Your EMI will be: ₹{emi}/month</h5>
            </Card>
        );
    };

    // ✅ Denied View
    const renderDenied = () => (
        <Card className="p-4 mt-4 shadow">
            <h2 className="text-danger">❌ Application Denied</h2>
            <p>Unfortunately, your credit score does not meet the minimum requirement for loan approval.</p>
        </Card>
    );

    // ✅ Render based on approval
    return (
        <Container>
            {response.approved ? renderApproved() : renderDenied()}
        </Container>

    );
};
