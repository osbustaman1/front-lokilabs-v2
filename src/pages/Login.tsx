import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { login } from "../js/login";
import "../assets/plugins.bundle.css";
import "../assets/style.bundle.css";
import "../assets/login.css";


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
        // Validar que el error tenga la propiedad 'type'
        if (!error || !error.type) {
            console.error('Error inesperado:', error);
            Swal.fire({
                title: 'Error desconocido',
                text: 'Ocurrió un error inesperado. Intenta nuevamente más tarde.',
                icon: 'error',
                confirmButtonText: 'Entendido',
                customClass: {
                    confirmButton: 'btn btn-danger'
                },
                buttonsStyling: false
            });
            return;
        }

        const errorConfig = {
            network: {
                title: 'Error de conexión',
                text: 'No se pudo contactar al servidor. Verifica tu conexión a Internet',
                icon: 'error'
            },
            validation: {
                title: 'Datos inválidos',
                text: 'Por favor verifica los datos ingresados',
                icon: 'warning'
            },
            auth: {
                title: 'Acceso denegado',
                text: 'Las credenciales proporcionadas son incorrectas',
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
            // Guardar el token en el localStorage
            localStorage.setItem('token', data.access);

            window.location.href = '/home';
            
        } catch (err) {
            const error = err instanceof APIError ? err : showErrorAlert(new APIError('auth', 'credenciales no validas'));
            showErrorAlert(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (


        <div className="d-flex flex-column flex-root vh-100 kt_app_root" id="kt_app_root">
            <div className="d-flex flex-column flex-column-fluid flex-lg-row">
                {/* Sección Branding */}
                <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
                    <div className="d-flex flex-center flex-lg-start flex-column">
                        <a href="/" className="mb-7">
                            <img 
                                alt="Logo" 
                                src="assets/media/logos/custom-3.svg" 
                                className="h-75px h-lg-100px" 
                            />
                        </a>
                        <h2 className="text-white fw-normal m-0">
                            Branding tools designed for your business
                        </h2>
                    </div>
                </div>

                <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
                    <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20">
                        <div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20"></div>
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

                        {/* Links adicionales */}
                        <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8 mt-5">
                            <a 
                            href="/reset-password" 
                            className="link-primary text-decoration-none"
                            >
                            Forgot Password?
                            </a>
                        </div>
                        
                        <div className="text-gray-500 text-center fw-semibold fs-6">
                            Not a Member yet? {' '}
                            <a 
                            href="/signup" 
                            className="link-primary text-decoration-none"
                            >
                            Sign up
                            </a>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default Login;