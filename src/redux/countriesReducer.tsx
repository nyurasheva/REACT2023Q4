// countriesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountriesState, IData } from '../types/interfaces';
import countryData from '../constants/country.json';

const initialState: CountriesState = {
  countries: countryData,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<IData[]>) {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;

export default countriesSlice.reducer;
