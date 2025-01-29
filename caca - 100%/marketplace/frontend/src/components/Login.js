import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken, setRole }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/auth/login', formData);
            console.log('Response:', res);
            console.log('Response Data:', res.data);
            setToken(res.data.token);
            const decodedToken = JSON.parse(atob(res.data.token.split('.')[1]));
            setRole(decodedToken.user.role);
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                console.error('Error Response Data:', err.response.data);
            }
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>correo</label>
                <input type="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div>
                <label>contraseña</label>
                <input type="password" name="password" value={password} onChange={onChange} required />
            </div>
            <button type="submit">iniciar sesion</button>
        </form>
    );
};

export default Login;