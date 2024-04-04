import React from 'react'
import LoginForm from '../login-form'

type Props = {}

const AuthTemplate = (props: Props) => {
    return (
        <div className='w-full min-h-screen relative bg-white dark:bg-gray-600 dark:text-white'>
            <div className="lg:w-1/3 w-4/5 border shadow-lg mx-auto bg-white px-4 py-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
                <h1 className='text-2xl text-center font-semibold'>Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}

export default AuthTemplate