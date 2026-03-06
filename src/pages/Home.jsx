import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container main-content text-center" style={{ paddingTop: '5rem' }}>
            <h1 className="mb-4" style={{ fontSize: '3rem', color: 'var(--primary)' }}>Unlock Your Tech Potential</h1>
            <p className="mb-6" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                Personalized learning pathways for grades 5-12 in computers, internet, and coding.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    Start Learning Free
                </Link>
                <Link to="/login" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    Welcome Back
                </Link>
            </div>

            <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                <div className="card">
                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Personalized Paths</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Learning content curated automatically based on your grade level.</p>
                </div>
                <div className="card">
                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Interactive Quizzes</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Test your knowledge after every module to ensure understanding.</p>
                </div>
                <div className="card">
                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Track Progress</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Build your profile and track everything you have learned over time.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
