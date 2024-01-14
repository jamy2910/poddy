import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = () => {
    return (
        <ToastContainer position="top-left"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            limit={1}
            theme="light" />
    )
}

export default CustomToast