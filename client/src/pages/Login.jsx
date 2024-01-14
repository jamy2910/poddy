import React, { useState } from 'react'
import StandardButton from '../components/StandardButton'
import LoginInput from '../components/LoginInput'
import { customFetch } from '../utils/customFetch';
import { useAuth } from '../auth/AuthContext';
import PodcastLoadingSpinner from '../components/PodcastLoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    // Hooks
    const [inputValues, setInputValues] = useState({ username: "", password: "" });
    const [state, setState] = useState('idle');
    const { loginAuth } = useAuth();
    const navigate = useNavigate();

    // Functions
    const onChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setState('submitting');
            const { data } = await customFetch.post('/auth/login', inputValues);
            await loginAuth();
            toast.success('Logged in')
        } catch (error) {
            toast.error('Not logged in')
        }

        setState('idle');
    }

    // JSX
    if (state === 'submitting') return <PodcastLoadingSpinner />

    return (
        <div className='grid grid-cols-2 gap-x-4 mb-36'>

            <div className='border border-solid border-emerald-700 text-center pb-4 rounded'>
                <h2 className='bg-emerald-700 text-white m-0 p-4 text-center'>Get premium now</h2>
                <h3 className='text-center'>Get access to advanced features such as monetization, no ads and more</h3>
                <StandardButton>Get premium now!</StandardButton>
            </div>


            <form onSubmit={onSubmit}>
                <div className='border border-solid border-emerald-700 pb-4 flex flex-col items-center gap-y-4 rounded'>
                    <h2 className='bg-emerald-700 text-white self-stretch text-center m-0 p-4'>Login</h2>
                    <LoginInput onChange={onChange} name={'username'} title={'E-mail'} />
                    <LoginInput onChange={onChange} name={'password'} type={'password'} title={'Password'} />
                    <StandardButton>Login</StandardButton>
                    <span>Don't have an account? <span onClick={() => { navigate('/register') }} className='text-emerald-700 cursor-pointer hover:underline'>Register here.</span></span>
                </div>
            </form>
        </div>

    )
}

export default Login