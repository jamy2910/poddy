import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoginInput from '../components/LoginInput'
import StandardButton from '../components/StandardButton'

const Register = () => {
    return (
        <div className='xl:w-3/4 md:w-11/12 mx-auto font-main'>
            <Navbar />

            {/* Grid Container Wrapper */}
            <div className='mb-96 grid grid-cols-2 gap-x-4'>

                {/* First Column */}
                <div></div>

                {/* Second Column (Register) */}
                <div className='flex flex-col gap-y-4 items-center border border-solid pb-4 border-emerald-700'>
                    <h2 className='text-center text-white bg-emerald-700 p-4 self-stretch m-0'>Register</h2>
                    <LoginInput title={'Username'} />
                    <LoginInput type={'email'} title={'E-mail'} />
                    <LoginInput type={'password'} title={'Password'} />
                    <LoginInput type={'password'} title={'Confirm password'} />
                    <StandardButton>Register</StandardButton>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Register