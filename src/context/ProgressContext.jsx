import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [recommendedModules, setRecommendedModules] = useState([]);
    const [loadingModules, setLoadingModules] = useState(false);

    const fetchRecommended = async () => {
        if (!user) return;
        setLoadingModules(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('https://event-backend-gamma.vercel.app/api/modules/recommended', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setRecommendedModules(await res.json());
            }
        } catch (err) {
            console.error('Error fetching recommended modules', err);
        }
        setLoadingModules(false);
    };

    useEffect(() => {
        if (user) {
            fetchRecommended();
        } else {
            setRecommendedModules([]);
        }
    }, [user]);

    return (
        <ProgressContext.Provider value={{ recommendedModules, loadingModules, fetchRecommended }}>
            {children}
        </ProgressContext.Provider>
    );
};
