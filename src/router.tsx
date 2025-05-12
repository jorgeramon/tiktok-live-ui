import { BrowserRouter, Route, Routes } from "react-router";
import { AuthLayout } from "./layouts/auth";
import { HomePage } from "./pages/home";
import { RequestPage } from "./pages/request";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path=":account_id" element={<AuthLayout />}>
                    <Route index path="requests" element={<RequestPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}