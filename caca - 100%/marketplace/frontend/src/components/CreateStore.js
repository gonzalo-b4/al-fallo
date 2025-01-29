import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateStore = ({ token }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [hasStore, setHasStore] = useState(false);

    const { name, description } = formData;

    useEffect(() => {
        const checkHasStore = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/stores/hasStore', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setHasStore(res.data.hasStore);
            } catch (err) {
                console.error('Error:', err);
                if (err.response) {
                    console.error('Error Response Data:', err.response.data);
                }
            }
        };

        checkHasStore();
    }, [token]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/stores', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', res);
            console.log('Response Data:', res.data);
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                console.error('Error Response Data:', err.response.data);
            }
        }
    };

    if (hasStore) {
        return <p>Ya tienes una tienda registrada.</p>;
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={onChange} required />
            </div>
            <div>
                <label>Description</label>
                <input type="text" name="description" value={description} onChange={onChange} required />
            </div>
            <button type="submit">Create Store</button>
        </form>
    );
};

export default CreateStore;