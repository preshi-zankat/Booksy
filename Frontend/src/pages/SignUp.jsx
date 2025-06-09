import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { MdEditNote } from 'react-icons/md';
import {registerUser}from '../api/user.api'; 

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        // API logic here
        try {
            const response = await registerUser({ name, email, password, bio });
            if (response.status === 201) {
                // Handle successful registration
                alert('Registration successful!');
                // Optionally redirect or clear form
                setName('');
                setEmail('');
                setPassword('');
                setBio('');
            }
        } catch (err) {
            // Handle error
            console.error(err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-[#FFF1F3] '>
            <div className='bg-white mt-12 p-8 rounded-xl shadow-lg w-full max-w-md'>
                <h1 className='text-4xl font-bold text-center font-lora text-gray-800 mb-6'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='relative'>
                        <FaUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8A80]'
                        />
                    </div>
                    <div className='relative'>
                        <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8A80]'
                        />
                    </div>
                    <div className='relative'>
                        <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8A80]'
                        />
                    </div>
                    <div className='relative'>
                        <MdEditNote className='absolute left-3 top-3 text-gray-400' />
                        <textarea
                            placeholder='Bio'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8A80]'
                            rows={3}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 bg-[#FF8A80] text-white rounded-md hover:bg-[#ff6f61] transition'
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    {error && <p className='text-red-500 text-sm text-center'>{error.message}</p>}
                </form>
            </div>
        </div>
    );
}

export default SignUp;
