// UncontrolledForm.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveFormData, setFormData, setFormValid } from '../redux/formReducer';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAppSelector } from '../redux/hooks';
import * as Yup from 'yup';
import { FormValidationSchema } from '../components/FormValidationSchema';
import { fields } from '../constants/fields';
import { Errors, FieldName } from '../types/interfaces';
import { MAIN_ROUTE } from '../constants/route';
import { convertToBase64, validateFile } from '../utils/convertToBase64';
import { AutoComplete } from '../components/AutoComplete';

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

  const onImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileErrors = validateFile(selectedFile, 'image');
      if (Object.keys(fileErrors).length > 0) {
        setErrors(fileErrors);
      } else {
        const base64String = await convertToBase64(selectedFile);
        const updatedFormData = { ...formData, image: base64String };
        dispatch(setFormData(updatedFormData));
        setErrors({});
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = {};

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
      setErrors(newErrors);
      return;
    }

    dispatch(setFormData(formData));
    dispatch(saveFormData());
    dispatch(setFormValid(true));
    setErrors({});
  };

  useEffect(() => {
    if (formValid) {
      dispatch(setFormValid(false));
      navigate(MAIN_ROUTE);
    }
  }, [dispatch, formValid, navigate]);

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
    <div key={fieldName} className="label">
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
    </div>
  );

  return (
    <div className="tygh">
      <Header />
      <main className="form">
        <div className="form__container">
          <h1>Неконтролируемая форма</h1>
          <div className="form__wrapper">
            <form onSubmit={handleSubmit}>
              {fields.map(({ label, name, type, options }) => (
                <React.Fragment key={name}>
                  {type === 'file' ? (
                    <label className="label label-image">
                      <span>Изображение:</span>
                      <input type="file" name={name} onChange={onImageSelect} />
                      {errors[name] && (
                        <div className="error-message">{errors[name]}</div>
                      )}
                    </label>
                  ) : type === 'radio' ? (
                    renderRadioButtons(label, name, options)
                  ) : name === 'country' ? (
                    <label className="label">
                      <span>Страна:</span>
                      <AutoComplete register={null} />
                      {errors[name] && (
                        <div className="error-message">{errors[name]}</div>
                      )}
                    </label>
                  ) : (
                    renderInputField(label, name, type)
                  )}
                </React.Fragment>
              ))}
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
