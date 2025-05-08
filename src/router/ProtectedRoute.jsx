import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element }) => {
    const isAuthenticated = true; // Aquí deberías implementar la lógica de autenticación
    return isAuthenticated ? element : <Navigate to="/" />;
};
