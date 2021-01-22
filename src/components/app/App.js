import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SuppliersRank from '../suppliers-rank/SuppliersRank'

function App() {
  const [data, setData] = useState([])

  useEffect(() => 
    fetch('orders.json')
      .then(response => response.json())
      .then(json => {
        setData(json)
        console.log(json)
      })
      .catch(error => console.error(error.message))
  , [])

  return (
    <Container className="App">
      <Element>
        <SuppliersRank data={data} />
      </Element>
      
    </Container>
  )
}

export default App

const Container = styled.div`
  background-color: #f5f5f5;
`

const Element = styled.div`
  background-color: #fff;
  display: inline-block;
  margin: 16px;
  padding: 16px;
`