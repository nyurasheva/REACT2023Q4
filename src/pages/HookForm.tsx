// HookForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { FormValidationSchema } from '../components/FormValidationSchema';
import { updateFormData } from '../redux/formReducer';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

interface FieldErrors {
  terms?: string;
  firstName?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  image?: string;
  country?: string;
}

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(FormValidationSchema),
  });

  const dispatch = useDispatch();
  const { formData } = useAppSelector((state) => state.formState);

  const onSubmit = () => {
    dispatch(updateFormData(formData));
    reset();
  };

  return (
    <div className="tygh">
      <Header />
      <main className="form">
        <div className="form__container">
          <h1>React Hook форма</h1>
          <div className="form__wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
              {[
                { label: 'Имя:', name: 'firstName', type: 'text' },
                { label: 'Возраст:', name: 'age', type: 'number' },
                { label: 'Email:', name: 'email', type: 'text' },
                { label: 'Пароль:', name: 'password', type: 'password' },
                {
                  label: 'Подтвердите пароль:',
                  name: 'confirmPassword',
                  type: 'password',
                },
                { label: 'Пол:', name: 'gender', type: 'radio' },
                { label: 'Страна:', name: 'country', type: 'text' },
                {
                  label: 'Принять условия и положения:',
                  name: 'terms',
                  type: 'checkbox',
                },
                {
                  label: 'Загрузить изображение:',
                  name: 'image',
                  type: 'file',
                },
              ].map(({ label, name, type }) => (
                <label key={name} className="label">
                  <span>{label}</span>
                  {type !== 'radio' && type !== 'checkbox' ? (
                    <input
                      {...register(name as keyof typeof formData)}
                      type={type}
                    />
                  ) : (
                    <input
                      {...register(name as keyof typeof formData)}
                      type={type}
                      value={label === 'Пол:' ? label.split(':')[1] : ''}
                    />
                  )}
                  {errors[name as keyof FieldErrors] && (
                    <span>{errors[name as keyof FieldErrors]?.message}</span>
                  )}
                </label>
              ))}
              <button
                type="submit"
                disabled={!isValid}
                className="button button-second button"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReactHookForm;
