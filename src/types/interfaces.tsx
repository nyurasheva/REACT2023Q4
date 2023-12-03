import { UseFormRegister } from 'react-hook-form';

export interface FormData {
  firstName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  image: File | string;
  country: string;
  terms?: boolean;
}

export interface FormState {
  formData: FormData;
  formValid: boolean;
}

export interface FormWithId extends FormData {
  id: number;
}

export interface ExtendedFormState extends FormState {
  formHistory: FormWithId[];
}

export interface Errors {
  [key: string]: string;
}

export interface IData {
  name: string;
  code: string;
}
export interface CountryField extends Omit<FormData, 'image'> {
  image: string;
}

export interface AutoCompleteProps {
  register: UseFormRegister<CountryField> | null;
}

export interface CountriesState {
  countries: IData[];
}

export type FieldName =
  | 'firstName'
  | 'age'
  | 'email'
  | 'password'
  | 'gender'
  | 'country';

export type CountryList = {
  [key: string]: string;
};
