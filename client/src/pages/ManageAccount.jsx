import AccountDetails from '../components/AccountDetails'
import StandardButton from '../components/StandardButton'
import AccountSettings from '../components/AccountSettings'
import { useAuth } from '../auth/AuthContext'

const ManageAccount = () => {

    const { user } = useAuth();

    return (
        <>
            <div className='md:w-3/4 mx-auto'>
                <div className='flex justify-between items-center'>
                    <h2>Account details</h2>
                    <StandardButton>Update details</StandardButton>
                </div>

                <AccountDetails title={'E-mail'} value={user.email} />
                <AccountDetails title={'Username'} value={user.username} />
                <div className='mt-4'>
                    <StandardButton onClick={() => { setRandomValue({ ...randomValue, 'value2': !randomValue.value2 }) }}>Change Password</StandardButton>
                </div>
            </div>

            <AccountSettings />
        </>

    )
}

export default ManageAccount