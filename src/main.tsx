import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import "toastify-js/src/toastify.css";
import './index.css';

import { IoProvider } from 'socket.io-react-hook';
import App from './app.tsx';

createRoot(document.getElementById('root')!).render(
  <IoProvider>
    <App />
  </IoProvider>
)
