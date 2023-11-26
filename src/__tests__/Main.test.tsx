import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Main } from '../components/Main';
import { NextRouter, useRouter } from 'next/router';

jest.mock('next/router', () => ({
  ...(jest.requireActual('next/router') as NextRouter),
  useRouter: jest.fn(),
}));

describe('Main component', () => {
  it('renders Main component', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/',
      query: { exampleQuery: '' },
      push: mockPush,
    }));

    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    expect(screen.getByText('2023')).toBeTruthy();
  });
});
