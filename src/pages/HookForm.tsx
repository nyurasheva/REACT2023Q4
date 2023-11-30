import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type FormData = {
  firstName: string;
  lastName: string;
};

const HookForm = () => {
  const { register, handleSubmit } = useForm<FormData>(); // Указываем тип FormData здесь

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data.firstName, data.lastName);
  };

  return (
    <div className="tygh">
      <Header />
      <div>
        <h1>React Hook Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('firstName')} />
          <input {...register('lastName')} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default HookForm;
