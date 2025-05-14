import CurrentPage from '@/pages/current';
import HomePage from '@/pages/home';
import RequestPage from '@/pages/request';
import ViewPage from '@/pages/view';
import { BrowserRouter, Route, Routes } from 'react-router';

export default () => (
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route path=":account_id/requests" element={<RequestPage />} />
      <Route path=":account_id/view" element={<ViewPage />} />
      <Route path=":account_id/current" element={<CurrentPage />} />
    </Routes>
  </BrowserRouter>
);
