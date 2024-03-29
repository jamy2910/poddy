import React, { useEffect, useRef, useState } from 'react'
import DropdownBox from './DropdownBox';

const FilterSelectInput = ({ name, onChange, options, title }) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState();
    const containerRef = useRef();

    const toggleDropdown = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const closeDropdown = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        window.addEventListener('click', closeDropdown);
        return () => {
            window.removeEventListener('click', closeDropdown);
        }
    }, []);

    return (
        <div ref={containerRef} className='relative inline-block'>

            <button onClick={toggleDropdown} className='px-4 cursor-pointer border border-solid text-base bg-white border-emerald-700'>{selected || title}</button>

            {open && <DropdownBox>
                {options.map((option) => {
                    return <h2 key={option} onClick={() => { onChange(name, option.toLowerCase()); setSelected(option); setOpen(false) }} className='text-black text-base font-normal text-left hover:bg-gray-500/50 p-1 rounded cursor-pointer'>{option}</h2>
                })}

            </DropdownBox>}
        </div>
    )
}

export default FilterSelectInput