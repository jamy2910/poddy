import React from 'react'
import Navbar from '../components/Navbar'
import ProfileNavCard from '../components/ProfileNavCard'
import Footer from '../components/Footer'

const MyProfile = () => {
  return (
    <div className='xl:w-3/4 md:w-11/12 mx-auto font-main'>
       <Navbar />

      <div className='grid grid-cols-2 gap-4 mb-40'>
        <ProfileNavCard to={'/mychannels'} title={'My channels'} description={'Manage, create and delete your channels'} buttonText={'See channels'} />
        <ProfileNavCard to={'/manageaccount'} title={'Account settings'} description={'Update email, change password, profile picture and privacy settings'} buttonText={'Account Settings'} />
        <ProfileNavCard to={'/activity'} title={'Activity'} description={'See all your comments, posts and likes'} buttonText={'See activity'} />
        <ProfileNavCard title={'Subscriptions'} description={'See the channels you are subscribed to'} buttonText={'See subscriptions'} />
      </div>

      <Footer />

    </div>
  )
}

export default MyProfile