import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
