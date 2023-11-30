// App.tsx

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
// import { Provider } from 'react-redux';
// import store from './redux/store';

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
