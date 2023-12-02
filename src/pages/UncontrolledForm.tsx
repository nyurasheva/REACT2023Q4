import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFormData, setFormValid } from '../redux/formReducer'; // Импорт экшена сохранения изображения
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAppSelector } from '../redux/hooks';
import * as Yup from 'yup';
import { FormValidationSchema } from '../components/FormValidationSchema';
import { fields } from '../constants/fields';
import { Errors, FieldName } from '../types/interfaces';
import { MAIN_ROUTE } from '../constants/route';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, formValid } = useAppSelector((state) => state.formState);
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
      | (HTMLInputElement & { target: { files: FileList } })
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    const updatedFormData = { ...formData, [name]: newValue };
    dispatch(setFormData(updatedFormData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = {};

    // Перебор всех полей и валидация их значений
    for (const { name } of fields) {
      try {
        await FormValidationSchema.validateAt(name as FieldName, formData, {
          abortEarly: false,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          newErrors[name as FieldName] = error.errors[0];
        }
      }
    }
    if (Object.keys(newErrors).length > 0) {
      console.log('Форма12');
      setErrors(newErrors);
      return;
    }
    console.log('Форма валидна');
    console.log(formData);
    dispatch(setFormData(formData));
    dispatch(setFormValid(true));
    setErrors({});
  };

  const renderInputField = (
    fieldLabel: string,
    fieldName: string,
    fieldType = 'text'
  ) => (
    <label className="label" key={fieldName}>
      <span>{fieldLabel}</span>
      <input
        type={fieldType}
        name={String(fieldName)}
        onChange={handleChange}
      />
      {errors[fieldName] && (
        <div className="error-message">{errors[fieldName]}</div>
      )}
    </label>
  );

  const renderRadioButtons = (
    fieldLabel: string,
    fieldName: string,
    options: string[] = []
  ) => (
    <label className="label" key={fieldName}>
      <span>{fieldLabel}</span>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={fieldName}
              value={option}
              checked={formData[fieldName as FieldName] === option}
              onChange={handleChange}
            />
            {option}
          </label>
        ))}
      </div>
      {errors[fieldName] && (
        <div className="error-message">{errors[fieldName]}</div>
      )}
    </label>
  );

  useEffect(() => {
    if (formValid) {
      dispatch(setFormValid(false));
      navigate(MAIN_ROUTE);
    }
  }, [dispatch, formValid, navigate]);

  return (
    <div className="tygh">
      <Header />
      <main className="form">
        <div className="form__container">
          <h1>Неконтролируемая форма</h1>
          <div className="form__wrapper">
            <form onSubmit={handleSubmit}>
              {fields.map(({ label, name, type, options }) =>
                type !== 'radio'
                  ? renderInputField(label, name, type)
                  : renderRadioButtons(label, name, options)
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
