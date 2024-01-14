import React from 'react'

const SearchBar = ({ updateSearch, value }) => {
    return (
        <div>

            <div className='flex justify-center'>
                <input onChange={updateSearch} value={value} name='search' type="text" className='focus:outline-0 border-2 text-base w-64 focus:w-96 transition-all border-emerald-700 border-solid' />
                <button className='border-0 bg-emerald-700 text-white text-base px-4 cursor-pointer'>Search</button>
            </div>
        </div>
    )
}

export default SearchBar