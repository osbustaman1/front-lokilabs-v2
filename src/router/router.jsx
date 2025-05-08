import App from "../App";
import Login from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home/*" element={<ProtectedRoute element={<App />} />} />
                <Route path="/" element={<Login />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
};
