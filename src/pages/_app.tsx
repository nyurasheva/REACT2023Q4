import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import store from '../redux/store';
import '../assets/scss/style.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}
