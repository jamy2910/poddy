import React, { useState } from 'react'
import StandardButton from './StandardButton'
import FilterSelectInput from './FilterSelectInput';

const FiltersDropdown = ({ live }) => {

  const [open, setOpen] = useState(false);

  const toggleFilters = () => {
    setOpen(!open)
  }

  return (
    <div className='text-center mt-4'>
      <StandardButton onClick={toggleFilters}>Filters</StandardButton>

      {open && <div className='border-solid border-b-2 border-0 border-emerald-700 pb-3'>
        <div className='mt-4 grid grid-cols-3 items-center p-4'>
          <FilterSelectInput options={['Any', 'Politics', 'Comedy', 'Science/Technology']} value={''} name={'Category'} />
          <FilterSelectInput options={['Any', 'Less than one hour', '1-2 hours', '2-3 hours', '3+ hours']} name={'Duration'} />
          {!live && <FilterSelectInput options={['Past 24 hours', 'Last 7 days', 'Last month']} name={'Date posted'} value={''} />}
        </div>
        <StandardButton>Apply Filters</StandardButton>
      </div>}



    </div>
  )
}

export default FiltersDropdown;