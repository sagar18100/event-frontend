import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', grade: 5 });
    const [error, setError] = useState('');

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const { name, email, password, grade } = formData;
        try {
            await register(name, email, password, grade);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
                <h2 className="text-center mb-6">Create an Account</h2>
                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Full Name</label>
                        <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input type="password" name="password" className="input-field" value={formData.password} onChange={handleChange} minLength="6" required />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Grade Level (5-12)</label>
                        <select name="grade" className="input-field" value={formData.grade} onChange={handleChange} style={{ background: 'var(--surface)' }} required>
                            {[5, 6, 7, 8, 9, 10, 11, 12].map(g => (
                                <option key={g} value={g}>Grade {g}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Start Learning</button>
                </form>
                <p className="text-center mt-4" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
