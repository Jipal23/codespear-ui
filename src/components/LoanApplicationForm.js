import React, { useState } from 'react';
import './LoanApplicationForm.css'; // We'll create this file for styling

export const LoanApplicationForm = (props) => {
  // State to hold all form data in a single object
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    annualIncome: '',
    employmentStatus: '', // Default empty state
    reason: '',
    idProof: null,
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});
  // State to manage the submission process
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // A single handler for text, date, and select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // A specific handler for the file input
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      idProof: e.target.files[0], // Store the file object
    });
  };

  // Function to validate the form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required.';
    if (!formData.address) newErrors.address = 'Address is required.';
    if (!formData.annualIncome) {
      newErrors.annualIncome = 'Annual Income is required.';
    } else if (isNaN(formData.annualIncome) || Number(formData.annualIncome) < 0) {
      newErrors.annualIncome = 'Please enter a valid income.';
    }
    if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment Status is required.';
    if (!formData.reason) newErrors.reason = 'Reason for application is required.';
    if (!formData.idProof) newErrors.idProof = 'ID Proof document is required.';

    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setStatusMessage('');

    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate an API call
      console.log('Form data submitted:', formData);
      setTimeout(() => {
        setIsSubmitting(false);
        setStatusMessage('Your application has been submitted successfully!');
        // Here you would typically reset the form or redirect the user
      }, 2000);
    } else {
      console.log('Form has validation errors.');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Credit Card Application</h1>
      <p className="form-subtitle">Please fill out the form below. All fields are required.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            aria-describedby="fullNameError"
          />
          {errors.fullName && <span id="fullNameError" className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            aria-describedby="dobError"
          />
          {errors.dateOfBirth && <span id="dobError" className="error-message">{errors.dateOfBirth}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            aria-describedby="addressError"
          ></textarea>
          {errors.address && <span id="addressError" className="error-message">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="annualIncome">Annual Income ($)</label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            placeholder="e.g., 30000"
            aria-describedby="incomeError"
          />
          {errors.annualIncome && <span id="incomeError" className="error-message">{errors.annualIncome}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="employmentStatus">Employment Status</label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            aria-describedby="employmentError"
          >
            <option value="" disabled>-- Please select --</option>
            <option value="Employed">Employed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Unemployed">Unemployed</option>
          </select>
          {errors.employmentStatus && <span id="employmentError" className="error-message">{errors.employmentStatus}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Credit Card Application</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            aria-describedby="reasonError"
          ></textarea>
          {errors.reason && <span id="reasonError" className="error-message">{errors.reason}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="idProof">Upload ID Proof (e.g., Driver's License, Passport)</label>
          <input
            type="file"
            id="idProof"
            name="idProof"
            onChange={handleFileChange}
            accept="image/*,.pdf"
            aria-describedby="idProofError"
          />
          {/* Display the name of the selected file for user feedback */}
          {formData.idProof && <span className="file-name">Selected file: {formData.idProof.name}</span>}
          {errors.idProof && <span id="idProofError" className="error-message">{errors.idProof}</span>}
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>

        {statusMessage && <div className="status-message">{statusMessage}</div>}
      </form>
    </div>
  );
};
