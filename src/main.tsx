import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { IoProvider } from 'socket.io-react-hook';
import App from './app.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IoProvider>
      <App />
    </IoProvider>
  </StrictMode>,
)
