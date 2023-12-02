// formReducer.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormData } from '../types/interfaces';

const initialState: FormState = {
  formData: {
    firstName: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    image: {} as FileList,
    country: '',
  },
  formValid: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<FormData>) {
      state.formData = action.payload;
    },
    setFormValid(state, action: PayloadAction<boolean>) {
      state.formValid = action.payload;
    },
  },
});

export const { setFormData, setFormValid } = formSlice.actions;

export default formSlice.reducer;
