import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../components/SearchInput';

describe('SearchInput component', () => {
  it('renders input and button correctly', () => {
    render(<SearchInput onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText('Поиск...');
    const buttonElement = screen.getByRole('button');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('handles input change correctly', () => {
    render(<SearchInput onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText('Поиск...');

    fireEvent.change(inputElement, { target: { value: 'Pikachu' } });

    expect((inputElement as HTMLInputElement).value).toBe('Pikachu');
  });

  it('calls onSearch callback on button click', () => {
    const onSearchMock = jest.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText('Поиск...');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, { target: { value: 'Charmander' } });
    fireEvent.click(buttonElement);

    expect(onSearchMock).toHaveBeenCalledWith('Charmander');
  });

  it('calls onSearch callback on Enter key press', () => {
    const onSearchMock = jest.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText('Поиск...');

    fireEvent.change(inputElement, { target: { value: 'Bulbasaur' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(onSearchMock).toHaveBeenCalledWith('Bulbasaur');
  });

  it('saves input value to local storage on search button click', () => {
    const onSearchMock = jest.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText('Поиск...');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, { target: { value: 'Squirtle' } });
    fireEvent.click(buttonElement);

    expect(localStorage.getItem('searchTerm')).toBe('Squirtle');
  });

  it('fetches value from local storage on mount', () => {
    localStorage.setItem('searchTerm', 'Jigglypuff');

    render(<SearchInput onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText('Поиск...');

    expect((inputElement as HTMLInputElement).value).toBe('Jigglypuff');
  });
});
