import React from 'react'
import Select from 'react-select'

const customStyles = {
  container: (provided) => ({
    ...provided,
    display: 'inline-block',
    fontSize: '14px',
    marginRight: '10px',
    width: '30%'
  }),
  control: (provided) => ({
    ...provided,
    '&:hover': {
      borderColor: '#304ffe'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected && '#304ffe',
    '&:hover': {
      backgroundColor: '#D6F5FF'
    }
  })
}

function Dropdown({ disabled, options, handleSelect }) {
  return (
    <Select 
      defaultValue={options[0]}
      isDisabled={disabled}
      options={options} 
      onChange={handleSelect}
      styles={customStyles}
    />
  )
}

export default Dropdown
