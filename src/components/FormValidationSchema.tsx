// FormValidationSchema.tsx

import * as Yup from 'yup';

export const FormValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Имя обязательно для заполнения')
    .matches(/^[A-Z]/, 'Имя должно начинаться с заглавной буквы'),
  age: Yup.number()
    .positive('Возраст должен быть положительным числом')
    .integer('Возраст должен быть целым числом')
    .required('Возраст обязателен для заполнения'),
  email: Yup.string()
    .email('Введите корректный email адрес')
    .required('Email обязателен для заполнения'),
  password: Yup.string()
    .required('Пароль обязателен для заполнения')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[^\s]).{8,}$/,
      'Пароль должен содержать минимум 8 символов, включая цифру, заглавную и строчную буквы, а также спецсимвол'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтвердите пароль'),
  gender: Yup.string()
    .required('Выберите пол')
    .oneOf(['Мужской', 'Женский', 'Другой'], 'Выберите один из вариантов'),
  terms: Yup.boolean().oneOf([true], 'Примите условия и положения'),
  image: Yup.string().required('Выберите изображение'),
  country: Yup.string().required('Страна обязательна для заполнения'),
});
