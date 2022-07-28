import React from 'react'

function SelectBtn ({ children, selected, onClick }) {
  return (
    <span
    className='selectBtn'
    onClick={onClick}
    >{children}</span>
  )
}

export default SelectBtn;