import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import BackendApi from './BackendApi';
import { useHistory } from 'react-router-dom';

/**
 * A detailed loan application form tailored for individuals applying for a loan,
 * with a focus on accommodating non-traditional or informal income sources.
 */
export const LoanApplicationForm = () => {
  // A single state object holds all form data for easier management.
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    isShop: '',
    isVehicle: '',
    annualIncome: '',
    employmentStatus: '',
    reason: '',
    idProof: null,
    employeeIdCard: null,
    recentSalarySlips: null,
    gasBillAmountMonthly: null,
    propertyBillAmountMonthly: null,
    utilityBillsGas: null,
    utilityBillsGasRation: null,
    bankCredit: null,
    bankDebit: null,
    bankTransactions: null,
    walletStatements: null, // Optional field
    informalIncomeProof: null,
    referenceName: '',
    referenceContact: '',
  });

    const history = useHistory();

  // State to hold validation errors for each field.
  const [errors, setErrors] = useState({});
  // State to manage the submission process (e.g., disabling the button).
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // A generic handler for text-based inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error for a field as the user starts correcting it.
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // A specific handler for file inputs.
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Store the selected file object.
    });
    // Clear the error for the file input when a file is selected.
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Validates all form fields and returns true if the form is valid.
  const validateForm = () => {
    const newErrors = {};
    // Validate required text and selection fields
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment Status is required.';
    if (!formData.reason.trim()) newErrors.reason = 'Reason for application is required.';
    if (!formData.referenceName.trim()) newErrors.referenceName = 'Reference Name is required.';
    if (!formData.referenceContact.trim()) newErrors.referenceContact = 'Reference Contact is required.';

    // Validate annual income
    if (!formData.annualIncome) {
      newErrors.annualIncome = 'Annual Income is required.';
    } else if (isNaN(formData.annualIncome) || Number(formData.annualIncome) < 0) {
      newErrors.annualIncome = 'Please enter a valid, positive income.';
    }

    // Validate required file uploads
    if (!formData.idProof) newErrors.idProof = 'ID Proof document is required.';
    if (!formData.bankTransactions) newErrors.bankTransactions = 'Bank Transaction statements are required.';
    if (!formData.informalIncomeProof) newErrors.informalIncomeProof = 'Proof of Informal Income is required.';

    setErrors(newErrors);
    // The form is valid if the newErrors object is empty.
    return Object.keys(newErrors).length === 0;
  };

  // Handles the form submission process.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser form submission.
    setStatusMessage('');

    if (validateForm()) {
      setIsSubmitting(true);
      // In a real application, you would send the formData to an API.
      // The `FormData` API is needed to handle file uploads.
      const submissionData = new FormData();
      Object.keys(formData).forEach(key => {
        submissionData.append(key, formData[key]);
      });

      console.log('Form is valid, submitting data:', formData);

      const response = await  BackendApi.register(formData);
      // ✅ Pass response as state to the status page

      history.push('/status', { response });

      setIsSubmitting(false);
    } else {
      setStatusMessage('Please correct the errors highlighted below before submitting.');
      console.log('Validation failed. Errors:', errors);
    }
  };

  return (
    <Container className="my-5 p-4 border rounded shadow-sm" style={{ maxWidth: '800px' }}>
      <h1 className="mb-3 text-center">Loan Application</h1>
      <p className="text-muted mb-4 text-center">
        We are here to help you get started. Please provide the following information.
      </p>

      <Form noValidate onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <h5 className="mt-4 mb-3 border-bottom pb-2">Personal Information</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} isInvalid={!!errors.fullName} required />
              <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
                      <Form.Group className="mb-3" controlId="mobileNo">
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} isInvalid={!!errors.mobileNo} required />
                        <Form.Control.Feedback type="invalid">{errors.mobileNo}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
            <Col md={6}>
            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} isInvalid={!!errors.dateOfBirth} required />
              <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
                                <Form.Group className="mb-3" controlId="dependents">
                                  <Form.Label>No. of dependents</Form.Label>
                                  <Form.Control type="text" name="dependents" value={formData.dependents} onChange={handleChange} isInvalid={!!errors.dependents} required />
                                  <Form.Control.Feedback type="invalid">{errors.dependents}</Form.Control.Feedback>
                                </Form.Group>
                              </Col>

        </Row>
        <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Current Address</Form.Label>
                  <Form.Control as="textarea" rows={3} name="address" value={formData.address} onChange={handleChange} isInvalid={!!errors.address} required />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

        <h5 className="mt-4 mb-3 border-bottom pb-2">Questionnaire</h5>
        <Row>
          {/* ✨ Yes/No Radio Buttons for "Do you own a vehicle?" */}
          <Form.Group as={Col} md={6} className="mb-3" controlId="isVehicle">
            <Form.Label>Do you own a vehicle? <span className="text-danger">*</span></Form.Label>
            {/* The 'isInvalid' on the wrapper helps show the error message correctly */}
            <div className={errors.isVehicle ? 'is-invalid' : ''}>
              <Form.Check
                inline
                type="radio"
                label="Yes"
                name="isVehicle"
                value="yes"
                onChange={handleChange}
                checked={formData.isVehicle === 'yes'}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="isVehicle"
                value="no"
                onChange={handleChange}
                checked={formData.isVehicle === 'no'}
              />
            </div>
            <Form.Control.Feedback type="invalid">{errors.isVehicle}</Form.Control.Feedback>
          </Form.Group>

          {/* ✨ Yes/No Radio Buttons for "Do you have a shop?" */}
          <Form.Group as={Col} md={6} className="mb-3" controlId="isShop">
            <Form.Label>Do you have a shop? <span className="text-danger">*</span></Form.Label>
            <div className={errors.isShop ? 'is-invalid' : ''}>
              <Form.Check
                inline
                type="radio"
                label="Yes"
                name="isShop"
                value="yes"
                onChange={handleChange}
                checked={formData.isShop === 'yes'}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="isShop"
                value="no"
                onChange={handleChange}
                checked={formData.isShop === 'no'}
              />
            </div>
            <Form.Control.Feedback type="invalid">{errors.isShop}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Financial Information Section */}
        <h5 className="mt-4 mb-3 border-bottom pb-2">Financial & Employment Information</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="annualIncome">
              <Form.Label>Annual Income ⟨₹⟩</Form.Label>
              <Form.Control type="number" name="annualIncome" placeholder="Total yearly income" value={formData.annualIncome} onChange={handleChange} isInvalid={!!errors.annualIncome} required />
              <Form.Control.Feedback type="invalid">{errors.annualIncome}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="employmentStatus">
              <Form.Label>Employment Status</Form.Label>
              <Form.Select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} isInvalid={!!errors.employmentStatus} required>
                <option value="" disabled>-- Please select --</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed / Homemaker / Student</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.employmentStatus}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="reason">
          <Form.Label>Reason for Loan Application</Form.Label>
          <Form.Control as="textarea" rows={3} name="reason" placeholder="e.g., To build credit history, for online purchases, for emergencies" value={formData.reason} onChange={handleChange} isInvalid={!!errors.reason} required />
          <Form.Control.Feedback type="invalid">{errors.reason}</Form.Control.Feedback>
        </Form.Group>

        {/* Document Upload Section */}
        <h5 className="mt-4 mb-3 border-bottom pb-2">Document Uploads</h5>
        <p className="text-muted small">Please upload clear copies of the following documents. Accepted formats: PDF, JPG, PNG.</p>

        <Form.Group className="mb-3" controlId="idProof">
          <Form.Label>1. ID Proof <span className="text-danger">*</span></Form.Label>
          <Form.Control type="file" name="idProof" onChange={handleFileChange} isInvalid={!!errors.idProof} accept="image/*,.pdf" required />
          <Form.Text>e.g., Aadhar Card, Driver's License, Passport</Form.Text>
          <Form.Control.Feedback type="invalid">{errors.idProof}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="employeeIdCard">
          <Form.Label>2. Employee ID Card </Form.Label>
          <Form.Control type="file" name="employeeIdCard" onChange={handleFileChange} isInvalid={!!errors.additionalProof} accept="image/*,.pdf" />
          <Form.Text>e.g., Employee ID Card</Form.Text>
          <Form.Control.Feedback type="invalid">{errors.additionalProof}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="recentSalarySlips">
                  <Form.Label>3. Recent Salary Slips </Form.Label>

                      <Form.Group className="mb-3" controlId="salaryAmountMonthly">
                        <Form.Label>Monthly income</Form.Label>
                        <Form.Control type="text" name="salaryAmountMonthly" placeholder="Monthly income" value={formData.salaryAmountMonthly} onChange={handleChange} isInvalid={!!errors.salaryAmountMonthly} required />
                        <Form.Control.Feedback type="invalid">{errors.salaryAmountMonthly}</Form.Control.Feedback>
                      </Form.Group>

                  <Form.Control type="file" name="recentSalarySlips" onChange={handleFileChange} isInvalid={!!errors.additionalProof} accept="image/*,.pdf" />
                  <Form.Text>e.g., Recent Salary Slips</Form.Text>
                  <Form.Control.Feedback type="invalid">{errors.additionalProof}</Form.Control.Feedback>
                </Form.Group>

        <Form.Group className="mb-3" controlId="utilityBillsGas">
                  <Form.Label>4. Utility Bill (Gas, Electricity, Water) </Form.Label>
                  <Form.Group className="mb-3" controlId="gasBillAmountMonthly">
                          <Form.Label>Monthly bill</Form.Label>
                          <Form.Control type="text" name="gasBillAmountMonthly" placeholder="Monthly bill" value={formData.gasBillAmountMonthly} onChange={handleChange} isInvalid={!!errors.gasBillAmountMonthly} required />
                          <Form.Control.Feedback type="invalid">{errors.gasBillAmountMonthly}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Control type="file" name="utilityBillsGas" onChange={handleFileChange} isInvalid={!!errors.utilityBillsGas} accept="image/*,.pdf" />
                  <Form.Text>e.g., Utility Bill (Gas, Electricity, Water Bill)</Form.Text>
                  <Form.Control.Feedback type="invalid">{errors.utilityBillsGas}</Form.Control.Feedback>
                </Form.Group>
        <Form.Group className="mb-3" controlId="utilityBillsGasRation">
          <Form.Label>5. Utility Bill (Property Tax, Ration Card)</Form.Label>
          <Form.Group className="mb-3" controlId="propertyBillAmountMonthly">
                    <Form.Label>Monthly bill</Form.Label>
                    <Form.Control type="text" name="propertyBillAmountMonthly" placeholder="Monthly bill" value={formData.propertyBillAmountMonthly} onChange={handleChange} isInvalid={!!errors.propertyBillAmountMonthly} required />
                    <Form.Control.Feedback type="invalid">{errors.gasBillAmountMonthly}</Form.Control.Feedback>
            </Form.Group>
          <Form.Control type="file" name="utilityBillsGasRation" onChange={handleFileChange} isInvalid={!!errors.utilityBillsGasRation} accept="image/*,.pdf" />
          <Form.Text>e.g., Property Tax, Ration Card</Form.Text>
          <Form.Control.Feedback type="invalid">{errors.utilityBillsGasRation}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="bankTransactions">
          <Form.Label>6. Bank Transactions (Last 3 Months) <span className="text-danger">*</span></Form.Label>
          <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="backCredit">
                        <Form.Label>Credit</Form.Label>
                        <Form.Control type="text" name="backCredit" placeholder="Credit" value={formData.backCredit} onChange={handleChange} isInvalid={!!errors.backCredit} required />
                        <Form.Control.Feedback type="invalid">{errors.backCredit}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="backDebit">
                          <Form.Label>Debit</Form.Label>
                          <Form.Control type="text" name="backDebit" placeholder="Debit" value={formData.backDebit} onChange={handleChange} isInvalid={!!errors.backDebit} required />
                          <Form.Control.Feedback type="invalid">{errors.backDebit}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
          </Row>
          <Form.Control type="file" name="bankTransactions" onChange={handleFileChange} isInvalid={!!errors.bankTransactions} accept="image/*,.pdf" required />
          <Form.Text>e.g., Bank statements or passbook pages</Form.Text>
          <Form.Control.Feedback type="invalid">{errors.bankTransactions}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="informalIncomeProof">
          <Form.Label>7. Evidence of How You Earn Money <span className="text-danger">*</span></Form.Label>
          <Form.Control type="file" name="informalIncomeProof" onChange={handleFileChange} isInvalid={!!errors.informalIncomeProof} accept="image/*,.pdf" required />
          <Form.Text>For self-employed or informal work. e.g., photos of your work, receipts from customers, a letter explaining your work.</Form.Text>
          <Form.Control.Feedback type="invalid">{errors.informalIncomeProof}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="walletStatements">
          <Form.Label>8. Payment Wallet Statements</Form.Label>
          <Form.Control type="file" name="walletStatements" onChange={handleFileChange} accept="image/*,.pdf" />
          <Form.Text>e.g., Statements from digital wallets like PayPal, Venmo, etc.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="remarks">
                  <Form.Label>Remarks for Loan Application</Form.Label>
                  <Form.Control as="textarea" rows={3} name="remarks" placeholder="e.g., To support your loan application" value={formData.remarks} onChange={handleChange} isInvalid={!!errors.remarks} required />
                  <Form.Control.Feedback type="invalid">{errors.remarks}</Form.Control.Feedback>
        </Form.Group>

        {/* Reference Section */}
        <h5 className="mt-4 mb-3 border-bottom pb-2">Reference from a Trusted Individual</h5>
        <p className="text-muted small">Provide contact info for someone who can confirm your identity (e.g., community leader, previous employer).</p>
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3" controlId="referenceName">
                    <Form.Label>Reference's Full Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" name="referenceName" value={formData.referenceName} onChange={handleChange} isInvalid={!!errors.referenceName} required />
                    <Form.Control.Feedback type="invalid">{errors.referenceName}</Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3" controlId="referenceContact">
                    <Form.Label>Reference's Contact (Phone or Email) <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" name="referenceContact" value={formData.referenceContact} onChange={handleChange} isInvalid={!!errors.referenceContact} required />
                    <Form.Control.Feedback type="invalid">{errors.referenceContact}</Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        {/* Submission Status and Button */}
        {statusMessage && (
          <Alert variant={Object.keys(errors).length > 0 && !isSubmitting ? 'danger' : 'success'} className="mt-4">
            {statusMessage}
          </Alert>
        )}

        <div className="d-grid mt-4">
            <Button variant="primary" type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
        </div>
      </Form>
    </Container>
  );
};