import React from 'react'

const PageWrapper = ({children}) => {
  return (
    <div className='xl:w-3/4 md:w-11/12 mx-auto font-main'>
        {children}
    </div>
  )
}

export default PageWrapper