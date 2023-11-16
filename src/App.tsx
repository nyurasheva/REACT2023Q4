// App.tsx

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import ErrorBoundary from './components/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
