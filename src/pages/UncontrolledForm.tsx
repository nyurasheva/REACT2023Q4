// UncontrolledForm.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface FormData {
  firstName: string;
  lastName: string;
}

const UncontrolledForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="tygh">
      <Header />
      <div>
        <h1>Uncontrolled Form</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" onChange={handleChange} />
          <input type="text" name="lastName" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UncontrolledForm;
