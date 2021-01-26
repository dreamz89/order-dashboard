import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

import TopProducts from '../top-products/TopProducts'
import OrderVolume from '../order-volume/OrderVolume'
import SuppliersRank from '../suppliers-rank/SuppliersRank'
import DeliveriesList from '../deliveries-list/DeliveriesList'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
  }

  h2, h4, h5 {
    margin-top: 0;
  }

  h5, p {
    font-size: 14px;
    text-align: left;
  }
`

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
      <GlobalStyle />
      <LeftContainer>
        <Element>
          <TopProducts data={data} />
        </Element>
        <Element>
          <OrderVolume data={data} />
        </Element>
        <Element>
          <SuppliersRank data={data} />
        </Element>
      </LeftContainer>
      <Element>
        <DeliveriesList data={data} />
      </Element>
    </Container>
  )
}

export default App

const Container = styled.div`
  background-color: #f5f5f5;
  display: flex;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Element = styled.div`
  background-color: #fff;
  border-radius: 8px;
  display: inline-block;
  margin: 16px;
  padding: 20px;
  width: 600px;
`