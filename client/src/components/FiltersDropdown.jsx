import React, { useState } from 'react'
import StandardButton from './StandardButton'
import FilterSelectInput from './FilterSelectInput';

const FiltersDropdown = ({ filterFunction, updateFilters }) => {

  const [open, setOpen] = useState(false);

  const toggleFilters = () => {
    setOpen(!open)
  }

  return (
    <div className='text-center mt-4'>
      <StandardButton onClick={toggleFilters}>{open ? 'Close filters' : 'Open filters'}</StandardButton>

      {open &&
        <div className='border-solid border-b-2 border-0 border-emerald-700 pb-3'>
          <div className='mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-3 items-center box-border p-4'>
            <FilterSelectInput onChange={updateFilters} options={['Any', 'Politics', 'Comedy', 'Science/Technology']} title={'Category'} name={'category'} />
            <FilterSelectInput onChange={updateFilters} options={['Any', 'Less than one hour', '1-2 hours', '2-3 hours', '3+ hours']} title={'Duration'} name={'date'} />
          </div>
          <StandardButton onClick={filterFunction}>Apply Filters</StandardButton>
        </div>}

    </div>
  )
}

export default FiltersDropdown;