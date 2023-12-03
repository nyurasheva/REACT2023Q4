// formReducer.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtendedFormState, FormData, FormWithId } from '../types/interfaces';

const initialState: ExtendedFormState = {
  formData: {
    firstName: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    image: '',
    country: '',
  },
  formValid: false,
  formHistory: [],
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
    saveFormData(state) {
      const id = state.formHistory.length + 1;
      const formDataWithId: FormWithId = { ...state.formData, id };
      state.formHistory.push(formDataWithId);
      state.formData = initialState.formData;
      state.formValid = initialState.formValid;
    },
  },
});

export const selectFormHistory = (state: { formState: ExtendedFormState }) =>
  state.formState.formHistory;

export const { setFormData, setFormValid, saveFormData } = formSlice.actions;

export default formSlice.reducer;
