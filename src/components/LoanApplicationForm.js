import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

export const LoanApplicationForm = (props) => {
  // State to hold all form data in a single object
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    annualIncome: '',
    employmentStatus: '',
    reason: '',
    idProof: null,
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});
  // State to manage the submission process
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // A single handler for most inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error for the field when the user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // A specific handler for the file input
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      idProof: e.target.files[0], // Store the file object
    });
     // Clear the error for the field when a file is selected
    if (errors.idProof) {
      setErrors({
        ...errors,
        idProof: null,
      });
    }
  };

  // Function to validate the form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.annualIncome) {
      newErrors.annualIncome = 'Annual Income is required.';
    } else if (isNaN(formData.annualIncome) || Number(formData.annualIncome) < 0) {
      newErrors.annualIncome = 'Please enter a valid, positive income.';
    }
    if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment Status is required.';
    if (!formData.reason.trim()) newErrors.reason = 'Reason for application is required.';
    if (!formData.idProof) newErrors.idProof = 'ID Proof document is required.';

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setStatusMessage('');

    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate an API call to submit the data
      console.log('Form data submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      setStatusMessage('Your application has been submitted successfully!');
      // Reset form or redirect user
    } else {
      setStatusMessage('Please correct the errors before submitting.');
      console.log('Form has validation errors.');
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-3">Credit Card Application</h1>
      <p className="text-muted mb-4">
        Please fill out the form below. All fields are required.
      </p>

      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            isInvalid={!!errors.fullName}
            required
          />
          <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            isInvalid={!!errors.dateOfBirth}
            required
          />
          <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
            isInvalid={!!errors.address}
            required
          />
          <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="annualIncome">
          <Form.Label>Annual Income ($)</Form.Label>
          <Form.Control
            type="number"
            name="annualIncome"
            placeholder="e.g., 30000"
            value={formData.annualIncome}
            onChange={handleChange}
            isInvalid={!!errors.annualIncome}
            required
          />
          <Form.Control.Feedback type="invalid">{errors.annualIncome}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="employmentStatus">
          <Form.Label>Employment Status</Form.Label>
          <Form.Select
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            isInvalid={!!errors.employmentStatus}
            required
          >
            <option value="" disabled>-- Please select --</option>
            <option value="Employed">Employed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Unemployed">Unemployed</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.employmentStatus}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="reason">
          <Form.Label>Reason for Credit Card Application</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            isInvalid={!!errors.reason}
            required
          />
          <Form.Control.Feedback type="invalid">{errors.reason}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="idProof">
          <Form.Label>Upload ID Proof (e.g., Driver's License, Passport)</Form.Label>
          <Form.Control
            type="file"
            name="idProof"
            onChange={handleFileChange}
            isInvalid={!!errors.idProof}
            accept="image/*,.pdf"
            required
          />
          <Form.Control.Feedback type="invalid">{errors.idProof}</Form.Control.Feedback>
        </Form.Group>

        {statusMessage && (
          <Alert variant={Object.keys(errors).length > 0 && !isSubmitting ? 'danger' : 'success'} className="mt-4">
            {statusMessage}
          </Alert>
        )}

        <Button variant="primary" type="submit" disabled={isSubmitting} className="mt-3">
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </Form>
    </Container>
  );
};