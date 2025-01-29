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
        <div className="form-container sign-in-container">
            <form onSubmit={onSubmit}>
                <h1>Sign in</h1>
                <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account</span>
                <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required />
                <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                <a href="#">Forgot your password?</a>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Login;