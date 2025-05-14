import { BrowserRouter, Route, Routes } from "react-router";
import { AuthLayout } from "./layouts/auth";
import { RequestPageLayout } from "./layouts/request";
import { HomePage } from "./pages/home";
import { RequestPage } from "./pages/request";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path=":account_id" element={<AuthLayout />}>
                    <Route path="requests" element={<RequestPageLayout><RequestPage /></RequestPageLayout>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}