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
  background-color: ${ props => props.active === props.choice && '#D6F5FF'};
  color: ${ props => props.active === props.choice ? '#304ffe' : '#666'};
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  padding: 6px 12px;

  &:first-child {
    border: 1px solid ${ props => props.active === props.choice ? '#304ffe' : '#666'};
    border-right: ${ props => props.active !== props.choice && 0};
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border: 1px solid ${ props => props.active === props.choice ? '#304ffe' : '#666'};
    border-left: ${ props => props.active !== props.choice && 0};
    border-radius: 0 4px 4px 0;
  }
`
