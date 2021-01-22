import React from 'react'
import styled from 'styled-components'

function Toggle({ choices, active, handleActive }) {

  return (
    <Outer>
      <Inner 
        active={active}
        choice={choices[0].choice}
        onClick={() => handleActive(choices[0].choice)}
      >
        { choices[0].label }
      </Inner>
      <Inner 
        active={active}
        choice={choices[1].choice}
        onClick={() => handleActive(choices[1].choice)}
      >
        { choices[1].label }
      </Inner>
    </Outer>
  )
}

export default Toggle

const Outer = styled.div`
  display: flex;
`

const Inner = styled.div`
  color: ${ props => props.active === props.choice && '#304ffe'};
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  padding: 0 8px;

  &:first-child {
    border-right: 1px solid gray;
  }
`
