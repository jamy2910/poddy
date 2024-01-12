
const RegisterConfirmation = () => {
    return (
        <div className='flex flex-col items-center justify-center h-60 mb-60'>
            <h2 className='text-4xl text-white p-4 self-stretch text-center bg-emerald-700'>Thanks for registering!</h2>
            <h3 className='text-center text-xl'>Welcome to Poddy. We have sent you a confirmation email. Verify your email to continue. <span className='text-emerald-700 hover:underline cursor-pointer'>Click here to login</span></h3>

            <p className='font-medium'>Please allow up to 5 minutes to recieve an e-mail. If you haven't recieved an e-mail please <span className='font-bold text-emerald-700 hover:underline cursor-pointer'>contact us here</span></p>
        </div>
    )
}

export default RegisterConfirmation