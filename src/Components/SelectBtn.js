import React from 'react'

function SelectBtn ({ children, onClick }) {
  return (
    <span
    className='selectBtn'
    onClick={onClick}
    >{children}</span>
  )
}

export default SelectBtn;