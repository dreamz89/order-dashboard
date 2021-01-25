import React from 'react'
import Select from 'react-select'

function Dropdown({ disabled, options, handleSelect }) {
  return (
    <Select 
      defaultValue={options[0]}
      isDisabled={disabled}
      options={options} 
      onChange={handleSelect}
    />
  )
}

export default Dropdown
