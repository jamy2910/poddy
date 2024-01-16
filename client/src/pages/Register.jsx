import { useState } from 'react'
import LoginInput from '../components/LoginInput'
import StandardButton from '../components/StandardButton'
import { customFetch } from '../utils/customFetch'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useStatus } from '../components/StatusContext'

const Register = () => {

    // Hooks
    const [inputValues, setInputValues] = useState({ username: "", password: "", email: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Functions
    const onSumbit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { password, confirmPassword } = inputValues;
        if (password !== confirmPassword) {
            return alert('Passwords do not match');
        }

        try {
            const response = await customFetch.post('/auth/register', inputValues);
            console.log(response);
            navigate('/register-confirm');
        } catch ({ response }) {
            toast.error(response?.data?.msg);
        }

        setLoading(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    }


    return (

        <>
            {/* Grid Container Wrapper */}
            <div className='mb-96 grid grid-cols-2 gap-x-4'>

                {/* First Column */}
                <div></div>

                {/* Second Column (Register) */}
                <form onSubmit={onSumbit}>
                    <div className='flex flex-col gap-y-4 items-center rounded border border-solid pb-4 border-emerald-700'>
                        <h2 className='text-center text-white bg-emerald-700 p-4 self-stretch m-0'>Register</h2>
                        <LoginInput onChange={handleChange} value={inputValues.name} name={'username'} title={'Username'} />
                        <LoginInput onChange={handleChange} value={inputValues.email} name={'email'} type={'email'} title={'E-mail'} />
                        <LoginInput onChange={handleChange} value={inputValues.password} name={'password'} type={'pass'} title={'Password'} />
                        <LoginInput onChange={handleChange} value={inputValues.confirmPassword} name={'confirmPassword'} type={'pass'} title={'Confirm password'} />
                        <StandardButton>Register</StandardButton>
                        <span>Already have an account? <span onClick={() => { navigate('/login') }} className='text-emerald-700 cursor-pointer hover:underline'>Log in here.</span></span>
                    </div>
                </form>

            </div>
        </>


    )
}

export default Register