// formReducer.tsx

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    firstName: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'Мужской',
    terms: false,
    image: {} as FileList,
    country: '',
  },
  errors: {
    firstName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: '',
    image: '',
    country: '',
  },
  isValid: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { payload } = action;
      state.formData = payload.formData || state.formData;
      state.errors = payload.errors || state.errors;

      // Проверка на наличие данных в state.formData перед извлечением значений
      const {
        firstName = '',
        age = 0,
        email = '',
        password = '',
        confirmPassword = '',
      } = state.formData;

      state.errors.firstName = /^[A-Z]/.test(firstName)
        ? ''
        : 'Имя должно начинаться с заглавной буквы';
      state.errors.age =
        !isNaN(age) && age >= 0
          ? ''
          : 'Возраст должен быть положительным числом';
      state.errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ''
        : 'Введите корректный email адрес';
      state.errors.password =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[^\s]).{8,}$/.test(
          password
        )
          ? ''
          : 'Пароль должен содержать минимум 8 символов, включая цифру, заглавную и строчную буквы, а также специальный символ';
      state.errors.confirmPassword =
        password === confirmPassword ? '' : 'Пароли не совпадают';

      // Если все поля прошли валидацию, то установливаем флаг валидности формы
      state.isValid = Object.values(state.errors).every(
        (error) => error === ''
      );
    },
  },
});

export const { updateFormData } = formSlice.actions;

export default formSlice.reducer;
