import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import PageWrapper from '../components/PageWrapper'
import { useEffect } from 'react'
import { scrollTop } from '../utils/scrollToTop'

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