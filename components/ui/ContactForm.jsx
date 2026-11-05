'use client';

import { useState } from 'react';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Shorts',
    budget: '',
    message: '',
    company_fax_hp: '' // Honeypot field
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message describing your project (at least 10 characters).';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.message || 'Something went wrong. Please try again.');
        }
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setServerError('Network error. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-form-wrap" aria-live="polite">
        <div className="form-success-banner">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h4 className="form-success-title">Message Sent</h4>
          <p className="form-success-desc">
            Thanks for reaching out! Shobu reviews project inquiries daily and will reply within 24 hours.
          </p>
          <button
            type="button"
            className="form-submit-btn"
            style={{ padding: '0 24px', marginTop: '12px' }}
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                projectType: 'Shorts',
                budget: '',
                message: '',
                company_fax_hp: ''
              });
            }}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-wrap">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {/* Honeypot field (hidden from view) */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <input
            type="text"
            name="company_fax_hp"
            tabIndex="-1"
            value={formData.company_fax_hp}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="form-grid-2">
          {/* Name */}
          <div className="form-field">
            <label htmlFor="contact-name" className="form-label">
              Your Name *
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              className={`form-input ${errors.name ? 'has-error' : ''}`}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name && (
              <p id="contact-name-error" className="form-error" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="contact-email" className="form-label">
              Email Address *
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@company.com"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="form-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="form-grid-2">
          {/* Project Type */}
          <div className="form-field">
            <label htmlFor="contact-type" className="form-label">
              Project Type
            </label>
            <select
              id="contact-type"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Shorts">Shorts & Reels (Vertical)</option>
              <option value="Long-form">Long-form (YouTube / Doc)</option>
              <option value="Ad">Commercial / Ad</option>
              <option value="Color">Color Grading Only</option>
              <option value="Other">Other / Full Retainer</option>
            </select>
          </div>

          {/* Budget */}
          <div className="form-field">
            <label htmlFor="contact-budget" className="form-label">
              Target Budget <span className="form-label-optional">(Optional)</span>
            </label>
            <input
              id="contact-budget"
              name="budget"
              type="text"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g. $500 - $2,000 / month"
              className="form-input"
            />
          </div>
        </div>

        {/* Message */}
        <div className="form-field">
          <label htmlFor="contact-message" className="form-label">
            Project Overview *
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about the footage volume, deadline, visual references, and narrative goal..."
            className={`form-textarea ${errors.message ? 'has-error' : ''}`}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
          />
          {errors.message && (
            <p id="contact-message-error" className="form-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {serverError && (
          <p className="form-error" role="alert" style={{ fontSize: '13px' }}>
            {serverError}
          </p>
        )}

        <button
          type="submit"
          className="form-submit-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <span>Sending inquiry...</span>
          ) : (
            <>
              <span>Send Project Inquiry</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
