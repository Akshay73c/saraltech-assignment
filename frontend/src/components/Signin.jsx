import React, { useState } from 'react';
import axios from 'axios';  // Assuming you use Axios for requests
import { useNavigate } from 'react-router-dom';
import '../styles/Signin.css'


export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/signin', { email, password });
            setEmail('')
            setPassword('')
            console.log(response);
            navigate(`/profile/${response.data.user.id}`)

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="signin">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

