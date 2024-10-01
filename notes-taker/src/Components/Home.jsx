import React, { useEffect } from 'react'
import { AddNote } from './AddNote'
import { useNavigate } from 'react-router-dom'

export const Home = (props) => {
  
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
        
    }
    else {
        navigate('/login');
    }
    // eslint-disable-next-line
}, [])

  return (
    <div>
      <AddNote showAlert={props.showAlert}/>
    </div>
  )
}
