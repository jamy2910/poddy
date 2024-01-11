import React, {useState} from 'react'
import AccountDetailsSwitch from './AccountDetailsSwitch'
import StandardButton from './StandardButton'

const AccountSettings = () => {

    const [randomValue, setRandomValue] = useState({
        value1: true,
        value2: false,
        value4: false,
        value3: true
    });

    const onChange = (newValue, name) => {
        setRandomValue({...randomValue, [name]: !newValue });
        toggleHasChanged();
    }

    const [hasChanged, setHasChanged] = useState(false);

    const toggleHasChanged = () => {
        setHasChanged(true);
    }

    
    return (
        <div className='w-3/4 mt-10 mx-auto'>
            <h2 className='mt-0 mb-0 border-0 border-b-2 pb-2 border-solid border-emerald-700'>Account Settings</h2>

            <AccountDetailsSwitch title={'Explicit Content'} name={'value1'} value={randomValue.value1} description={'Enable this to see content from podcasts rated 18+'} changeValue={onChange} />
            <AccountDetailsSwitch title={'Private Account'} name={'value2'} value={randomValue.value2} description={'Enable this if you would like your accout to be private. This means users will not be able to view your profile'} changeValue={onChange} />
            <AccountDetailsSwitch title={'E-mail marketing'} name={'value3'} value={randomValue.value3} description={'Allow Poddy to send you marketing and update emails'} changeValue={onChange} />
            <AccountDetailsSwitch title={'Data usage'} name={'value4'} value={randomValue.value4} description={'Allow Poddy to use your non-sensitive data such as browsing behaviour to improve and update the platform'} changeValue={onChange} />
            <div className='mt-4'>
                <StandardButton isDisabled={hasChanged}>Apply Changes</StandardButton>
            </div>

        </div>
    )
}

export default AccountSettings