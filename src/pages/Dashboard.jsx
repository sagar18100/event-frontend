import React, { useContext, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ProgressContext } from '../context/ProgressContext';

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const { recommendedModules, loadingModules, fetchRecommended } = useContext(ProgressContext);

    useEffect(() => {
        if (user) {
            fetchRecommended();
        }
    }, [user]);

    if (loading) return <div className="container main-content">Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    const completedCount = user.progress?.length || 0;

    return (
        <div className="container main-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--primary)' }}>My Dashboard</h1>
                <div style={{ background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Grade {user.grade}</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card text-center">
                    <h3 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{completedCount}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Modules Completed</p>
                </div>
                <div className="card text-center">
                    <h3 style={{ fontSize: '2rem', color: 'var(--success)', marginBottom: '0.5rem' }}>
                        {user.quizScores?.filter(q => q.passed).length || 0}
                    </h3>
                    <p style={{ color: 'var(--text-muted)' }}>Quizzes Passed</p>
                </div>
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Recommended for You</h2>
            {loadingModules ? (
                <p>Loading your pathway...</p>
            ) : recommendedModules.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {recommendedModules.map(module => (
                        <div key={module._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 'bold' }}>{module.category}</span>
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>{module.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                                {module.description}
                            </p>
                            <Link to={`/module/${module._id}`} className="btn btn-primary" style={{ width: '100%' }}>
                                Start Module
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card text-center" style={{ padding: '3rem 1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>You're all caught up!</h3>
                    <p style={{ color: 'var(--text-muted)' }}>You've completed all recommended modules for your grade. Great job!</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
