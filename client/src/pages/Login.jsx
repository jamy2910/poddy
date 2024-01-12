import React from 'react'
import StandardButton from '../components/StandardButton'
import LoginInput from '../components/LoginInput'

const Login = () => {
    return (

        <div className='grid grid-cols-2 gap-x-4 mb-36'>

            <div className='border border-solid border-emerald-700 text-center pb-4 rounded'>
                <h2 className='bg-emerald-700 text-white m-0 p-4 text-center'>Get premium now</h2>
                <h3 className='text-center'>Get access to advanced features such as monetization, no ads and more</h3>
                <StandardButton>Get premium now!</StandardButton>
            </div>

            <div className='border border-solid border-emerald-700 pb-4 flex flex-col items-center gap-y-4 rounded'>
                <h2 className='bg-emerald-700 text-white self-stretch text-center m-0 p-4'>Login</h2>
                <LoginInput title={'E-mail'} />
                <LoginInput type={'password'} title={'Password'} />
                <StandardButton>Login</StandardButton>
            </div>
        </div>

    )
}

export default Login