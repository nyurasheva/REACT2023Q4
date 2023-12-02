// HookForm.tsx

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { FormValidationSchema } from '../components/FormValidationSchema';
import { setFormData, setFormValid } from '../redux/formReducer';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { fields } from '../constants/fields';
import { MAIN_ROUTE } from '../constants/route';
import { FieldName, FormData } from '../types/interfaces';
import { convertToBase64 } from '../utils/convertToBase64';

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    setError,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(FormValidationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formValid } = useAppSelector((state) => state.formState);

  const onFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const fieldName = event.target.name;
      const fileErrors = validateFile(selectedFile, fieldName);
      if (Object.keys(fileErrors).length === 0) {
        try {
          const base64String = await convertToBase64(selectedFile);
          setValue('image', base64String);
        } catch (error) {
          console.error('Ошибка при конвертации файла в Base64:', error);
        }
      } else {
        Object.keys(fileErrors).forEach((key) => {
          const errorMessage = fileErrors[key];
          setError(key as FieldName, { type: 'manual', message: errorMessage });
        });
      }
    }
  };

  const validateFile = (file: File, name: string) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 1024 * 1024;
    const errors = {} as Record<string, string>;

    if (!allowedTypes.includes(file.type)) {
      errors[name] = 'Недопустимый тип файла';
    }
    if (file.size > maxSize) {
      errors[name] = 'Файл слишком большой';
    }

    return errors;
  };

  const onSubmit = (data: FormData) => {
    dispatch(setFormData(data));
    dispatch(setFormValid(true));
    reset();
  };

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
          <h1>React Hook форма</h1>
          <div className="form__wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map(({ label, name, type, options }) => (
                <label key={name} className="label">
                  <span>{label}</span>
                  {type === 'file' ? (
                    <input
                      name={name}
                      type={type}
                      onChange={(e) => onFileSelect(e)}
                    />
                  ) : type === 'radio' ? (
                    <div>
                      {options?.map((option: string) => (
                        <label key={option}>
                          <input
                            {...register(name as FieldName)}
                            type={type}
                            value={option}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input {...register(name as FieldName)} type={type} />
                  )}
                  {errors[name as FieldName] && (
                    <div className="error-message">
                      {errors[name as FieldName]?.message}
                    </div>
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
