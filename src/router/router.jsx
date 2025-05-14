import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../pages/Login";
import { App } from "../pages/App";
import { Profile } from "../pages/Profile";
import { NotFound } from "../components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useValidateSesion } from '../hooks/useValidateSesion';

export const Router = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home/*" element={<ProtectedRoute element={<App />} />} />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
