"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

interface ILoginData {
    email: string
    password: string
}

const LoginForm = (props: Props) => {
    const router = useRouter()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = event.currentTarget
        event.preventDefault();
        const loginData: ILoginData = {
            email: email.value,
            password: password.value,
        };
        try {
            const response = await axios.post<{ access_token: string, refresh_token: string }>(`https://frontend-exam.digitalfortress.dev/auth/login`, loginData);
            const accessToken = response.data.access_token
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                router.push('/')
            }

        } catch (error) {
            console.error('Error occurred:', error);
        }

    };

    return (
        <form className='flex flex-col gap-4 mt-8' onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label className='text-sm font-semibold' htmlFor="email">Email</label>
                <input type="text" id='email' name='email' className='rounded-lg w-full border outline-none px-4 py-2' />
            </div>
            <div className="flex flex-col gap-2 mb-4">
                <label className='text-sm font-semibold' htmlFor="password">Password</label>
                <input type="password" id='password' name='password' className='rounded-lg w-full border outline-none px-4 py-2' />
            </div>
            <div className="flex items-center justify-center">
                <button type='submit' className="border px-6 py-2 rounded-lg bg-green-300 text-white font-medium">Login</button>
            </div>
        </form>
    )
}

export default LoginForm