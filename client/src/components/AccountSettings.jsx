import React, { useEffect, useState } from 'react'
import AccountDetailsSwitch from './AccountDetailsSwitch'
import StandardButton from './StandardButton'
import { customFetch } from '../utils/customFetch'

const AccountSettings = () => {

    // Hooks
    const [hasChanged, setHasChanged] = useState(false);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const getAccountSettings = async () => {
            try {
                const { data } = await customFetch.get('/settings');
                setSettings(data);
            } catch (error) {
                console.log(error)
            }
        }

        getAccountSettings();
    }, [])

    // Functions
    const onChange = (newValue, name) => {
        setSettings({ ...settings, [name]: !newValue });
        setHasChanged(true);
    }

    const updateAccountSettings = async () => {
        try {
            const response = await customFetch.patch('/settings', settings);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-3/4 mt-10 mx-auto'>
            <h2 className='mt-0 mb-0 border-0 border-b-2 pb-2 border-solid border-emerald-700'>Account Settings</h2>

            <AccountDetailsSwitch title={'Explicit Content'} value={settings.explicit} name={'explicit'} description={'Enable this to see content from podcasts rated 18+'} changeValue={onChange} />
            <AccountDetailsSwitch title={'Private Account'} value={settings.keepprivate} name={'keepprivate'} description={'Enable this if you would like your accout to be private. This means users will not be able to view your profile'} changeValue={onChange} />
            <AccountDetailsSwitch title={'E-mail marketing'} value={settings.emails} name={'emails'} description={'Allow Poddy to send you marketing and update emails'} changeValue={onChange} />
            <AccountDetailsSwitch title={'Data usage'} value={settings.datausage} name={'datausage'} description={'Allow Poddy to use your non-sensitive data such as browsing behaviour to improve and update the platform'} changeValue={onChange} />
            <div className='mt-4'>
                <StandardButton onClick={updateAccountSettings} isDisabled={hasChanged}>Apply Changes</StandardButton>
            </div>
        </div>
    )
}

export default AccountSettings