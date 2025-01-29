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
        <form onSubmit={onSubmit}>
            <div>
                <label>Nombre</label>
                <input type="text" name="name" value={name} onChange={onChange} required />
            </div>
            <div>
                <label>correo</label>
                <input type="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div>
                <label>contraseña</label>
                <input type="password" name="password" value={password} onChange={onChange} required />
            </div>
            <div>
                <label>Role</label>
                <select name="role" value={role} onChange={onChange}>
                    <option value="owner">tienda</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;