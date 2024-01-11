import React from 'react'
import StandardButton from './StandardButton'
import { useNavigate } from 'react-router-dom'

const ProfileNavCard = ({title, description, buttonText, to}) => {

    const navigate = useNavigate();

  return (
    <div className='border-2 border-solid border-emerald-700 p-4'>
        <h2>{title}</h2>
        <p>{description}</p>
        <StandardButton onClick={() => {navigate(to)}}>{buttonText}</StandardButton>
    </div>
  )
}

export default ProfileNavCard