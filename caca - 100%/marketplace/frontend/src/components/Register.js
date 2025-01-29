import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'owner'
    });

    const { name, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/auth/register', formData);
            console.log('Response:', res);
            console.log('Response Data:', res.data);
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                console.error('Error Response Data:', err.response.data);
            }
        }
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={onSubmit}>
                <h1>Create Account</h1>
                <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" name="name" placeholder="Name" value={name} onChange={onChange} required />
                <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required />
                <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                <select name="role" value={role} onChange={onChange}>
                    <option value="owner">tienda</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;