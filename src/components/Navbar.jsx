import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>
                    EduTech
                </Link>
                <div>
                    {user ? (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Hello, {user.name}</span>
                            <Link to="/dashboard" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Dashboard</Link>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Logout</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
