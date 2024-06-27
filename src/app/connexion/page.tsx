'use client';
import React from 'react';
import Layout from '../components/Layout';
import Form from '../components/Form';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const router = useRouter();
    const fields = [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Mot de passe', type: 'password' },
    ];

    const handleSubmit = (data: { [key: string]: string }) => {
        console.log(data)
        router.push('/marketplace');
    };

    return (
        <div className="w-screen max-w-screen flex justify-center h-screen">
            <div className="bg-connexion-background h-full w-1/2 flex justify-center items-center px-16 relative">
                <img className="absolute top-5 left-5" src="/views/connexion/logo.png" alt="" />
                <div className="text-container">
                    <h2 className='font-michroma text-white text-2xl font-light'>
                        Passerelles vers vos opportunités.
                    </h2>
                    <div className="h-0.5 bg-white my-4"></div> 
                    <p className='text-white text-base font-light'>
                        Kascade est une application conçue pour simplifier la gestion des réponses aux appels d'offres.
                    </p>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center flex-col ">
                <h2 className="font-michroma text-xl px-8">Sign In</h2>
                <Form fields={fields} onSubmit={handleSubmit} submitButtonText="Connexion" />
            </div>
        </div>
    );
};

export default Login;
