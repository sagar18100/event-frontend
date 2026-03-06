import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch('https://event-backend-gamma.vercel.app/api/auth/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                    } else {
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error('Failed to load user', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async (email, password) => {
        const res = await fetch('https://event-backend-gamma.vercel.app/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || 'Login failed');

        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data;
    };

    const register = async (name, email, password, grade) => {
        const res = await fetch('https://event-backend-gamma.vercel.app/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, grade: Number(grade) })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || 'Registration failed');

        localStorage.setItem('token', data.token);

        // Auto-fetch user details after register
        const userRes = await fetch('https://event-backend-gamma.vercel.app/api/auth/me', {
            headers: { 'Authorization': `Bearer ${data.token}` }
        });
        if (userRes.ok) {
            setUser(await userRes.json());
        }
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
