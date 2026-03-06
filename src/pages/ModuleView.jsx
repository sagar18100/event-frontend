import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ModuleView = () => {
    const { id } = useParams();
    const { user, loading } = useContext(AuthContext);
    const [module, setModule] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const res = await fetch(`https://event-backend-gamma.vercel.app/api/modules/${id}`);
                if (!res.ok) throw new Error('Failed to load module');
                setModule(await res.json());
            } catch (err) {
                setError(err.message);
            }
        };
        fetchModule();
    }, [id]);

    if (loading) return <div className="container main-content">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (error) return <div className="container main-content text-center" style={{ color: 'var(--danger)' }}>{error}</div>;
    if (!module) return <div className="container main-content">Loading module...</div>;

    return (
        <div className="container main-content">
            <Link to="/dashboard" style={{ color: 'var(--primary)', display: 'inline-block', marginBottom: '1.5rem', fontWeight: '500' }}>
                &larr; Back to Dashboard
            </Link>

            <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', mb: '1.5rem' }}>
                    <div>
                        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
                            {module.category}
                        </span>
                        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{module.title}</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px' }}>{module.description}</p>
                    </div>
                </div>

                <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem', position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
                    <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        src={module.contentUrl}
                        title={module.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="text-center" style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Ready to test your knowledge?</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Take the quiz to complete this module and earn points.</p>
                    <Link to={`/quiz/${module._id}`} className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                        Take Quiz
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModuleView;
