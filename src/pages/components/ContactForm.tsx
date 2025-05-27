import { ContactFormFields } from '@/shared/models/ContactFormFields';
import React, { useState } from 'react';
import FormField from './FormField';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<ContactFormFields>({
    firstName: '',
    lastName: '',
    contactInfo: '',
    message: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
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
