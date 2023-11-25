import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../components/SearchInput';
import { setSearchTermValue } from '../redux/pokemonReducer';
import { useAppDispatch } from '../redux/hooks';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../redux/hooks', () => ({
  ...jest.requireActual('../redux/hooks'),
  useAppDispatch: jest.fn(),
}));

describe('SearchInput component', () => {
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  it('renders input and button correctly', () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText('Поиск...');
    const buttonElement = screen.getByRole('button');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('handles input change correctly', () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText('Поиск...');

    fireEvent.change(inputElement, { target: { value: 'Pikachu' } });

    expect((inputElement as HTMLInputElement).value).toBe('Pikachu');
  });

  it('calls dispatch with setSearchTermValue action on button click', () => {
    const dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText('Поиск...');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, { target: { value: 'charmander' } });
    fireEvent.click(buttonElement);

    expect(dispatch).toHaveBeenCalledWith(setSearchTermValue('charmander'));
  });

  it('calls dispatch with setSearchTermValue action on Enter key press', () => {
    const dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText('Поиск...');

    fireEvent.change(inputElement, { target: { value: 'bulbasaur' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(dispatch).toHaveBeenCalledWith(setSearchTermValue('bulbasaur'));
  });

  it('saves input value to local storage on search button click', () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText('Поиск...');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, { target: { value: 'squirtle' } });
    fireEvent.click(buttonElement);

    expect(localStorage.getItem('searchTermValue')).toBe('squirtle');
  });

  it('fetches value from local storage on mount', () => {
    localStorage.setItem('searchTermValue', 'Jigglypuff');

    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText('Поиск...');

    expect((inputElement as HTMLInputElement).value).toBe('Jigglypuff');
  });
});
