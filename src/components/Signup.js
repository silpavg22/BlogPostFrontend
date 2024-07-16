import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");

    const apiBaseUrl = 'http://localhost:5000/'; // Change to your backend's address

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiBaseUrl}/login`, {
                username: loginEmail,
                password: loginPassword,
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.access_token);
            alert('Login successful!');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed!');
        }
    };

    const handleSignup = async () => {
        try {
            const response = await axios.post(
                `${apiBaseUrl}/signup`,
                {
                    username: registerEmail,
                    password: registerPassword,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            );
            console.log(response.data);
            alert('Signup successful!');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Signup failed!');
        }
    };

    
    const LoginForm = () => {
        return (
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out p-6">
                <h2 className='p-3 text-3xl font-bold text-pink-400'>Create your Blog</h2>
                <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3>

                {/* Inputs */}
                <div className='flex flex-col items-center justify-center'>
                    <input
                        type='email'
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
                        placeholder='Email'
                    />
                    <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
                        placeholder='Password'
                    />
                    <button
                        className='rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                </div>
                <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
            </div>
        )
    }

    const SignUpForm = () => {
        return (
            <div className="bg-blue-400 text-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in p-6">
                <h2 className='p-3 text-3xl font-bold text-white'>Create your Blog</h2>
                <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
                <h3 className='text-xl font-semibold text-white pt-2'>Create Account!</h3>
                <div className='flex space-x-2 m-4 items-center justify-center'>
                </div>
                {/* Inputs */}
                <div className='flex flex-col items-center justify-center mt-2'>
                    <input
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-white m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0 text-black'
                        placeholder='Username'
                    />
               
                    <input
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-white m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0 text-black'
                        placeholder='Password'
                    />
                    <button
                        className='rounded-2xl m-4 text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in'
                        onClick={handleSignup}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
                <p className='text-white mt-4 text-sm'>Already have an account?</p>
                <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(true)}>Sign In to your Account?</p>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
            <main className="flex items-center justify-center w-full px-2 md:px-20">
                {
                    isLogin ? (
                        <LoginForm />
                    ) : (
                        <SignUpForm />
                    )
                }
            </main>
        </div>
    )
}

export default Login;
