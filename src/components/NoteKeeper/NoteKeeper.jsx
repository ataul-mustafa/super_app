import React from 'react';
import './NoteKeeper.css'

function NoteKeeper() {

    const handleClick = (e) =>{
        window.localStorage.setItem("Note", e.target.value)
    }
  return (
    <div className='noteContainer'>
        <h1>All Notes</h1>
        <textarea onChange={handleClick} cols="30" rows="10" placeholder='Write you note here...'></textarea>
    </div>
  )
}

export default NoteKeeper