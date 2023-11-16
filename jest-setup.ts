import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
global.matchMedia = global.matchMedia || function mockMatchMedia() {
  return {
    matches: false,
    addListener() { },
    removeListener() { },
  };
};
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});