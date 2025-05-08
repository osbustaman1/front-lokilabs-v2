import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { login } from "../js/login";
import "../assets/plugins.bundle.css";
import "../assets/style.bundle.css";

interface LoginFormData {
    username: string;
    password: string;
}

interface LoginFormProps {
    onLoginSuccess: (token: string) => void;
    apiUrl: string;
    csrfToken: string;
}

// Tipo para errores personalizados
class APIError extends Error {
    constructor(public type: 'network' | 'validation' | 'auth' | 'server', message: string) {
        super(message);
        this.name = 'APIError';
    }
}

export const Login: React.FC<LoginFormProps> = ({ onLoginSuccess, apiUrl, csrfToken }) => {
    const [formData, setFormData] = useState<LoginFormData>({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    // Función para mostrar errores con SweetAlert2
    const showErrorAlert = (error: APIError) => {
        const errorConfig = {
            network: {
                title: 'Error de conexión',
                text: 'No se pudo contactar al servidor. Verifica tu conexión a Internet',
                icon: 'error'
            },
            validation: {
                title: 'Datos inválidos',
                text: error.message,
                icon: 'warning'
            },
            auth: {
                title: 'Acceso denegado',
                text: error.message,
                icon: 'error'
            },
            server: {
                title: 'Error del servidor',
                text: 'Ocurrió un error inesperado. Intenta nuevamente más tarde',
                icon: 'error'
            }
        }[error.type];

        Swal.fire({
            ...errorConfig,
            confirmButtonText: 'Entendido',
            customClass: {
                confirmButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validación básica del RUT (ejemplo chileno)
        if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(formData.username)) {
            showErrorAlert(new APIError('validation', 'El RUT ingresado no es válido'));
            return;
        }

        setIsLoading(true);

        try {
            const data = await login(formData);
            await Swal.fire({
                title: '¡Bienvenido!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            onLoginSuccess(data.token);
            
        } catch (err) {
            const error = err instanceof APIError ? err : new APIError('network', 'Error desconocido');
            showErrorAlert(error);
            
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
                <label htmlFor="username">RUT</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="12345678-9"
                    pattern="^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$"
                    className="form-control"
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="form-control"
                    minLength={6}
                />
            </div>
            
            <button 
                type="submit" 
                className="btn btn-primary w-100" 
                disabled={isLoading}
            >
                {isLoading ? (
                    <span>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Cargando...
                    </span>
                ) : 'Ingresar'}
            </button>
        </form>
    );
}

export default Login;