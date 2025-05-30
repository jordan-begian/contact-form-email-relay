import { ContactFormFields } from '@/shared/models/ContactFormFields';
import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import client from '../services/MessageRelayClient';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<ContactFormFields>({
    firstName: '',
    lastName: '',
    contactInfo: '',
    message: '',
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const [visibleError, setVisibleError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (error) {
      setVisibleError(error);
    } else if (visibleError) {
      const timeout = setTimeout(() => setVisibleError(undefined), 1000);
      return () => clearTimeout(timeout);
    }
  }, [error, visibleError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    if (error) {
      setError(undefined);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(undefined);
    await client.relayAsEmail(form)
      .catch((error: Error) => {
        console.error('Error sending message:', error);
        setError('There was an error sending your message. Please try again later.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className={
      `contact-form
      ${error ?
        'shadow-2xl shadow-red-500/30' :
        'shadow-2xl/45 shadow-amber-200/15'
      }`
    }>
      <div className={
        `contact-form-error
        ${error ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
      }>
        {visibleError}
      </div>
      <FormField
        label="First Name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        required
        placeholder="First Name"
      />
      <FormField
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        required
        placeholder="Last Name"
      />
      <FormField
        label="Contact Info"
        name="contactInfo"
        value={form.contactInfo}
        onChange={handleChange}
        required
        placeholder="Email or Phone"
      />
      <FormField
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        required
        textarea
        placeholder="Your message"
      />
      <button type="submit" className="form-button">
        Send Message
      </button>
      </form>
  );
};

export default ContactForm;
