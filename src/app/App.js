import React, { useEffect, useState } from 'react'
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
    <div className="App">
      <SuppliersRank data={data} />
    </div>
  );
}

export default App;
