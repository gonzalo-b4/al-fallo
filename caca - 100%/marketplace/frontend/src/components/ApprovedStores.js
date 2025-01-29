import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApprovedStores = ({ token }) => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/stores/approved');
                console.log('Response:', res);
                console.log('Response Data:', res.data);
                setStores(res.data);
            } catch (err) {
                console.error('Error:', err);
                if (err.response) {
                    console.error('Error Response Data:', err.response.data);
                }
            }
        };

        fetchStores();
    }, []);

    const suspendStore = async id => {
        try {
            const res = await axios.put(`http://localhost:4000/api/stores/suspend/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', res);
            console.log('Response Data:', res.data);
            setStores(stores.map(store => store._id === id ? { ...store, status: 'suspended' } : store));
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                console.error('Error Response Data:', err.response.data);
            }
        }
    };

    const deleteStore = async id => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/stores/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', res);
            console.log('Response Data:', res.data);
            setStores(stores.filter(store => store._id !== id));
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                console.error('Error Response Data:', err.response.data);
            }
        }
    };

    return (
        <div>
            <h2>Tiendas Aprobadas</h2>
            <ul>
                {stores.map(store => (
                    <li key={store._id}>
                        {store.name} - {store.status}
                        <button onClick={() => suspendStore(store._id)}>Suspender</button>
                        <button onClick={() => deleteStore(store._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApprovedStores;