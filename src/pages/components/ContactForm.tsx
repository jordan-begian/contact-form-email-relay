import { ContactFormFields } from '@/shared/models/ContactFormFields';
import React, { useEffect, useState } from 'react';
import client from '@/pages_services/MessageRelayClient';
import FormField from './FormField';
import { of } from 'rxjs';

const ContactForm: React.FC = () => {
  const initialFormState: ContactFormFields = {
    firstName: '',
    lastName: '',
    contactInfo: '',
    message: '',
  };
  const [form, setForm] = useState<ContactFormFields>(initialFormState);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(undefined);
    client.relayAsEmail(of(form))
      .subscribe({
        next: () => { },
        error: (error: Error) => {
          console.error('Error sending message:', error);
          setError('There was an error sending your message. Please try again later.');
        },
        complete: () => {
          setForm(initialFormState);
        }
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
