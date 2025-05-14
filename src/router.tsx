import HomePage from '@/pages/home';
import RequestPage from '@/pages/request';
import { BrowserRouter, Route, Routes } from 'react-router';

export default () => (
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route path=":account_id/requests" element={<RequestPage />} />
    </Routes>
  </BrowserRouter>
);
