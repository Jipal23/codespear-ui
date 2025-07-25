import React from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';

import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { STATUS_PARTIAL, STATUS_REJECTED, STATUS_APPROVED, STATUS_KYC } from './Constant';

// EMI calculator
const calculateEMI = (principal, rate, tenureInYears) => {
    const tenureInMonths = tenureInYears * 12;                    // Convert years to months
    const monthlyRate = rate / (12 * 100);                        // Monthly interest rate in decimal
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
        (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
    return emi.toFixed(0);
};

export const ApplicationStatus = () => {

    const history = useHistory();
    const location = useLocation();
    const response = location.state?.response;

    if (!response) {
        return <Container><Card className="p-4 shadow"><p className="text-danger">No application data found.</p></Card></Container>

    }

    const handleApplyClick = () => {
        history.push('/videokyc');
    };


    // ✅ Patial Approved View
    const renderPartial = () => {
        const emi = calculateEMI(response.creditLimit, response.interestRate, response.tenure);

        return (
            <Card className="p-4 mt-4 shadow">
                <h2 className="text-success mb-3">🎉 Application Submitted, please proceed for KYC!</h2>
                <Row className="mb-3">
                    <Col><strong>Credit Limit:</strong> ₹{response.creditLimit}</Col>
                    <Col><strong>Interest Rate:</strong> {response.interestRate}%</Col>
                    <Col><strong>Tenure:</strong> {response.tenure} Year</Col>
                </Row>
                <h5>Your EMI will be: ₹{emi}/month</h5>

                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        <Button size='lg' onClick={handleApplyClick}>
                            Proceed to Video KYC
                        </Button>
                    </Col>
                </Row>
            </Card>
        );
    };

    // ✅ Approved View
    const renderApproved = () => {
        return (
            <Card className="p-4 mt-4 shadow">
                <h2 className="text-success mb-3">🎉 Loan Application Approved</h2>
                <p>Congratulations! Your loan application has been approved. Our team will contact you shortly with the next steps.</p>

            </Card>
        );
    };


    // ✅ kyc View
    const renderKycDone = () => {
        return (
            <Card className="p-4 mt-4 shadow">
                <h2 className="text-success mb-3">🎉 KYC Successfully Completed</h2>
                <p>Thank you for completing your KYC. Our team will now review your details. Please allow 3–5 working days for the next steps.</p>

            </Card>
        );
    };

    // ✅ Denied View
    const renderDenied = () => (
        <Card className="p-4 mt-4 shadow">
            <h2 className="text-danger">❌ Application Not Approved</h2>
            <p>We regret to inform you that your current credit score does not meet the eligibility criteria for loan approval at this time.</p>

        </Card>
    );

    // ✅ Render based on approval
    return (
        <Container>
            {response.status === STATUS_PARTIAL && renderPartial()}
            {response.status === STATUS_APPROVED && renderApproved()}
            {response.status === STATUS_REJECTED && renderDenied()}
            {response.status === STATUS_KYC && renderKycDone()}
        </Container>

    );
};
