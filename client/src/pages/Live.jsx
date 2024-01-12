import React from 'react'
import FiltersDropdown from '../components/FiltersDropdown'
import SearchBar from '../components/SearchBar'
import Podcasts from '../components/Podcasts'


const Live = () => {
  return (
    <>
      <SearchBar />

      <FiltersDropdown live={true} />

      <h2>Live Now</h2>
      <Podcasts />
    </>
  )
}

export default Live