/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormData {
  firstName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  image: any;
  country: string;
  terms?: boolean;
}

export interface FormState {
  formData: FormData;
  formValid: boolean;
}

export interface Errors {
  [key: string]: string;
}

export type FieldName =
  | 'firstName'
  | 'age'
  | 'email'
  | 'password'
  | 'gender'
  | 'country';
