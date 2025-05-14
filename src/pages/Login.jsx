import React from 'react'
import { useState, useEffect } from "react";

import { useLogin } from '../hooks/useLogin';


export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    
    const send_login = async () => {
        if (!username || !password) {
            $.alert({
                title: 'Alerta!',
                content: 'Los campos no pueden estar vacios',
            });
            return;
        }else{

            const { getFechLogin } = useLogin({ username, password });
            const response = await getFechLogin();
            const { error, status } = response;

            if (status) {
                window.location.href = '/home/profile';
            }else{
                $.alert({
                    title: 'Error!',
                    content: error,
                });
            }

        }
    }

    return (
        <>
            <div id="layoutAuthentication" className="bg-primary">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container-xl px-4">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    {/*<!-- Basic login form-->*/}
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header justify-content-center">
                                            <h3 className="fw-light my-4">
                                                Login
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            {/*<!-- Login form-->*/}
                                            <form>
                                                {/*<!-- Form Group (email address)-->*/}
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputEmailAddress">
                                                        Email
                                                    </label>
                                                    <input 
                                                        className="form-control" 
                                                        id="username"
                                                        name='username'
                                                        placeholder="12345678-9" 
                                                        type="text"
                                                        onChange={handleUserChange}
                                                    />
                                                </div>
                                                {/*<!-- Form Group (password)-->*/}
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputPassword">
                                                        Password
                                                    </label>
                                                    <input 
                                                        className="form-control" 
                                                        id="inputPassword" 
                                                        name='password'
                                                        placeholder="contraseña"
                                                        type="password"
                                                        onChange={handlePasswordChange}
                                                    />
                                                </div>
                                                {/*<!-- Form Group (remember password checkbox)-->*/}
                                                <div className="mb-3">
                                                    <div className="form-check">
                                                        <input className="form-check-input" id="rememberPasswordCheck"
                                                            type="checkbox" value="" />
                                                        <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                                            Remember password
                                                        </label>
                                                    </div>
                                                </div>
                                                {/*<!-- Form Group (login box)-->*/}
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <a className="small" href="auth-password-basic.html">
                                                        Forgot Password?
                                                    </a>
                                                    <a className="btn btn-primary" onClick={send_login}>
                                                        Ingresar
                                                    </a>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center">
                                            <div className="small">
                                                <a href="auth-register-basic.html">
                                                    Need an account? Sign up!
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="footer-admin mt-auto footer-dark">
                        <div className="container-xl px-4">
                            <div className="row">
                                <div className="col-md-6 small">
                                    ©2023 All Rights Reserved - Lokilabs
                                </div>
                                <div className="col-md-6 text-md-end small">
                                    <a href="#!">
                                        Privacy Policy
                                    </a>
                                    
                                    <a href="#!">
                                        Terms &amp; Conditions
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}
