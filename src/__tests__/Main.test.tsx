import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Main } from '../pages/Main';
import { BrowserRouter } from 'react-router-dom';

describe('Main component', () => {
  it('renders Main component', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('2023')).toBeTruthy();
  });
});
