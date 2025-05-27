import React from 'react';

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<
    | HTMLInputElement
    | HTMLTextAreaElement
  >) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  textarea = false,
  placeholder = '',
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="form-label">{label}</label>
    {textarea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="form-field resize-none overflow-auto"
        rows={8}
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="form-field"
      />
    )}
  </div>
);

export default FormField;
