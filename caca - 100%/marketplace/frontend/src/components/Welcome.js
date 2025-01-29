import React from 'react';

const Welcome = ({ role, storeName }) => {
    return (
        <div>
            <h1>Has iniciado sesión</h1>
            {role === 'owner' && <h2>Bienvenido a tu tienda: {storeName}</h2>}
            {role === 'admin' && <h2>Bienvenido Admin</h2>}
        </div>
    );
};

export default Welcome;
