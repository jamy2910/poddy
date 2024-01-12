import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import PageWrapper from '../components/PageWrapper'

const PageLayout = () => {
    return (
        <PageWrapper>
            <Navbar />
            <Outlet />
            <Footer />
        </PageWrapper>
    )
}

export default PageLayout