import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../pages/home";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}