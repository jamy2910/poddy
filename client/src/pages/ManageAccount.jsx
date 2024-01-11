import React from 'react'
import Navbar from '../components/Navbar'
import AccountDetails from '../components/AccountDetails'
import StandardButton from '../components/StandardButton'
import AccountSettings from '../components/AccountSettings'

const ManageAccount = () => {





    return (
        <div className='xl:w-3/4 md:w-11/12 mx-auto font-main'>

            <Navbar />

            <div className='w-3/4 mx-auto'>
                <div className='flex justify-between items-center'>
                <h2>Account details</h2>
                <StandardButton>Update details</StandardButton>
                </div>
                
                <AccountDetails title={'E-mail'} value={'jamiecolley02@gmail.com'} />
                <AccountDetails title={'Username'} value={'jamy1892'} />
                <div className='mt-4'>
                    <StandardButton onClick={() => {setRandomValue({...randomValue, 'value2': !randomValue.value2})}}>Change Password</StandardButton>
                </div>
            </div>

            <AccountSettings />
        </div>
    )
}

export default ManageAccount