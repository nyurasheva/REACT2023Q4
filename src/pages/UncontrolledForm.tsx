// UncontrolledForm.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFormData } from '../redux/formReducer';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAppSelector } from '../redux/hooks';
import * as Yup from 'yup';
import { FormValidationSchema } from '../components/FormValidationSchema';

interface Errors {
  [key: string]: string;
}

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const { formData } = useAppSelector((state) => state.formState);
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const [errors, setErrors] = useState<Errors>({
    firstName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: '',
    image: '',
    country: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | (HTMLInputElement & { files: FileList })
    >
  ) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    dispatch(updateFormData(updatedFormData));

    FormValidationSchema.validateAt(name, { [name]: value })
      .then(() => setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })))
      .catch((error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.errors[0],
        }));
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await FormValidationSchema.validate(formData, { abortEarly: false });
      console.log('Форма валидна');
      // Отправка данных или действия по успешной валидации
      setErrors({});
    } catch (validationErrors) {
      const formattedErrors: Errors = {};
      if (validationErrors instanceof Yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            formattedErrors[error.path] = error.message;
          }
        });
      }
      setErrors(formattedErrors);
    }
  };

  const renderInputField = (
    fieldLabel: string,
    fieldName: keyof Errors,
    fieldType = 'text',
    isPassword = false
  ) => (
    <label className="label" key={fieldName}>
      <span>{fieldLabel}:</span>
      <input
        type={fieldType}
        name={String(fieldName)}
        onChange={handleChange}
        {...(isPassword && { type: 'password' })}
      />
      {errors[fieldName] && (
        <div className="error-message">{errors[fieldName]}</div>
      )}
    </label>
  );

  const renderRadioButtons = (fieldName: string, options: string[]) => (
    <label className="label" key={fieldName}>
      <span>{fieldName}:</span>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="gender"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
    </label>
  );

  return (
    <div className="tygh">
      <Header />
      <main className="form">
        <div className="form__container">
          <h1>Неконтролируемая форма</h1>
          <div className="form__wrapper">
            <form onSubmit={handleSubmit}>
              {renderInputField('Имя', 'firstName')}
              {renderInputField('Возраст', 'age', 'number')}
              {renderInputField('Email', 'email', 'email')}
              {renderInputField('Пароль', 'password', 'password', true)}
              {renderInputField(
                'Подтвердите пароль',
                'confirmPassword',
                'password',
                true
              )}
              {renderRadioButtons('Пол', ['Мужской', 'Женский', 'Другой'])}
              {renderInputField('Страна', 'country')}
              {renderInputField('Загрузить изображение', 'image', 'file')}
              {renderInputField(
                'Принять условия и положения',
                'terms',
                'checkbox'
              )}
              <button type="submit" className="button button-second button">
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

export default UncontrolledForm;
