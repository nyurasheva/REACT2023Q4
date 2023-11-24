import { act, render } from '@testing-library/react';
import { Main } from '@/pages/Main';

describe('App component', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<Main />);
    });
  });
});
