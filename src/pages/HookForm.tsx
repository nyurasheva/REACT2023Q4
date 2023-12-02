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
  const navigate = useNavigate();
  const { formValid } = useAppSelector((state) => state.formState);

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
                  {type !== 'radio' ? (
                    <input {...register(name as FieldName)} type={type} />
                  ) : (
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
                  )}
                  {errors[name as FieldName] && (
                    <span>{errors[name as FieldName]?.message}</span>
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
