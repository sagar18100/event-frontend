import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ProgressContext } from '../context/ProgressContext';

const QuizView = () => {
    const { moduleId } = useParams();
    const { user, loading } = useContext(AuthContext);
    const { fetchRecommended } = useContext(ProgressContext);
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [error, setError] = useState('');
    const [results, setResults] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`https://event-backend-gamma.vercel.app/api/quizzes/module/${moduleId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to load quiz');
                const data = await res.json();
                setQuiz(data);
                setAnswers(new Array(data.questions.length).fill(null));
            } catch (err) {
                setError(err.message);
            }
        };
        if (user) fetchQuiz();
    }, [moduleId, user]);

    if (loading) return <div className="container main-content">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (error) return <div className="container main-content text-center" style={{ color: 'var(--danger)' }}>{error}</div>;
    if (!quiz) return <div className="container main-content">Loading quiz...</div>;

    const handleOptionSelect = (optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        // Check if all answered
        if (answers.includes(null)) {
            setError('Please answer all questions before submitting.');
            return;
        }

        setError('');
        setSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`https://event-backend-gamma.vercel.app/api/quizzes/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quizId: quiz._id, answers })
            });

            if (!res.ok) throw new Error('Submission failed');
            const data = await res.json();
            setResults(data);
            if (data.passed) {
                fetchRecommended(); // Refresh recommended modules globally
            }
        } catch (err) {
            setError(err.message);
        }
        setSubmitting(false);
    };

    if (results) {
        return (
            <div className="container main-content text-center">
                <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem' }}>
                    <h2 style={{ marginBottom: '1rem', color: results.passed ? 'var(--success)' : 'var(--danger)' }}>
                        {results.passed ? 'Congratulations!' : 'Keep Trying!'}
                    </h2>
                    <h1 style={{ fontSize: '4rem', margin: '1.5rem 0', color: 'var(--primary)' }}>
                        {Math.round(results.score)}%
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        You got {results.correctCount} out of {results.totalQuestions} correct.
                        <br />
                        Passing score: {quiz.passingScore}%
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        {results.passed ? (
                            <Link to="/dashboard" className="btn btn-primary">Return to Dashboard</Link>
                        ) : (
                            <>
                                <button onClick={() => { setResults(null); setAnswers(new Array(quiz.questions.length).fill(null)); setCurrentQuestionIndex(0); }} className="btn btn-primary">
                                    Retry Quiz
                                </button>
                                <Link to={`/module/${moduleId}`} className="btn btn-outline">Review Module</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    return (
        <div className="container main-content">
            <Link to={`/module/${moduleId}`} style={{ color: 'var(--primary)', display: 'inline-block', marginBottom: '1.5rem', fontWeight: '500' }}>
                &larr; Back to Module
            </Link>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                        <span>{Math.round(progressPercent)}% Completed</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ background: 'var(--primary)', height: '100%', width: `${progressPercent}%`, transition: 'width 0.3s ease' }}></div>
                    </div>
                </div>

                <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>{currentQuestion.questionText}</h2>

                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                    {currentQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            style={{
                                textAlign: 'left',
                                padding: '1rem 1.5rem',
                                fontSize: '1.1rem',
                                border: `2px solid ${answers[currentQuestionIndex] === idx ? 'var(--primary)' : 'var(--border)'}`,
                                borderRadius: 'var(--radius-md)',
                                background: answers[currentQuestionIndex] === idx ? 'rgba(79, 70, 229, 0.05)' : 'var(--surface)',
                                color: 'var(--text-main)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="btn btn-outline"
                        style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1, cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer' }}
                    >
                        Previous
                    </button>

                    {currentQuestionIndex === quiz.questions.length - 1 ? (
                        <button onClick={handleSubmit} disabled={submitting} className="btn btn-primary">
                            {submitting ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    ) : (
                        <button onClick={handleNext} className="btn btn-primary">
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizView;
