import React, { useRef } from 'react'
import * as d3 from 'd3'

function OrderVolume({ data }) {
  const d3Container = useRef(null)

  // Prepare data
  const groupedDate = data.reduce((acc, current) => {
    const index = acc.findIndex((obj) => obj.deliveryDate === current.deliveryDate) 
    if (index !== -1) {
      acc[index].volume += +current.price * +current.quantity
    } else {
      acc.push({
        deliveryDate: current.deliveryDate,
        volume: +current.price * +current.quantity
      })
    }
    return acc.sort((a,b) => new Date(a.deliveryDate) - new Date(b.deliveryDate))
  }, [])
  console.log(groupedDate)
  return (
    <div>
      <h2>Total Order Volume By Day</h2>
      <svg ref={d3Container} />
    </div>
  )
}

export default OrderVolume
