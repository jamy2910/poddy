import React from 'react'
import PageWrapper from '../components/PageWrapper'
import Navbar from '../components/Navbar'
import InlineInput from '../components/InlineInput'
import AccountDescriptionInput from '../components/AccountDescriptionInput'
import Footer from '../components/Footer'
import StandardButton from '../components/StandardButton'

const CreateChannel = () => {
  return (
    <PageWrapper>
      <Navbar />

      <div className='w-3/4 mx-auto'>
        <h2>Create channel</h2>
        <InlineInput title={'Channel name'} />
        <InlineInput title={'Channel headline'} />

        <AccountDescriptionInput title={'Channel description'} />

        <h3 className='font-medium'>Choose an image</h3>
        <input type="file" />

      </div>

      <div className='text-center'>
        <StandardButton>Create channel</StandardButton>
      </div>


      <Footer />


    </PageWrapper>
  )
}

export default CreateChannel