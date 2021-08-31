import { BrowserRouter } from 'react-router-dom';

import { ActiveUserProvider } from './context/ActiveUserContext';
import Routes from './Routes/Routes';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <ActiveUserProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ActiveUserProvider>
);

export default App;
