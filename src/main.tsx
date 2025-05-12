import { createRoot } from 'react-dom/client';

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "toastify-js/src/toastify.css";
import './index.css';

import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es';
import App from './app.tsx';

TimeAgo.addDefaultLocale(es)

createRoot(document.getElementById('root')!)
  .render(<App />);
