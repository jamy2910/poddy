import React from 'react'

const StandardButton = ({ children, onClick, isDisabled }) => {
    return (
        <button disabled={isDisabled === false} onClick={onClick} className='p-2 px-2 disabled:opacity-60 disabled:hover:scale-100 bg-emerald-700 rounded hover:scale-105 text-white border-none text-base cursor-pointer hover:opacity-80'>
            {children}
        </button>
    )
}

export default StandardButton