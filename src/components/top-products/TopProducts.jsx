import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

import Toggle from '../../shared/Toggle'

const choices = [
  {
    label: 'Purchase Volume (€)',
    choice: 'volume'
  }, { 
    label: 'Quantity',
    choice: 'quantity'
  }
]

function TopProducts({ data }) {
  const [active, setActive] = useState('volume')

  const d3Container = useRef(null)

  // Prepare data
  const groupedProducts = data.reduce((acc, current) => {
    const index = acc.findIndex((obj) => obj.productName === current.productName) 
    if (index !== -1) {
      acc[index].quantity += +current.quantity
      acc[index].volume += +current.price * +current.quantity
    } else {
      acc.push({
        productName: current.productName,
        quantity: +current.quantity,
        volume: +current.price * +current.quantity
      })
    }
    return acc
  }, [])

  const top3Products = groupedProducts.sort((a,b) => b[active] - a[active]).slice(0,3)

  useEffect(() => {
    // Define spaces
    const margin = { left: 50, right: 50, top: 50, bottom: 50 }
    const width = 560 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom
    
    const svg = d3.select(d3Container.current)
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right)
    
    // Allow space for axis
    const chart = svg.select('.chart')
        .attr('transform', 'translate(' + margin.left
          + ', ' + margin.top + ')')

    // Create x axis and y
    const x = d3.scaleBand()
      .domain(top3Products.map(d => d.productName))
      .range([0, width])
      .paddingInner(0.2)
      .paddingOuter(0.3)

    const xAxis = d3.axisBottom(x)
    chart.select('.x-axis')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`)
      .attr('font-family', 'Montserrat')
      .attr('font-size', 14)

    const y = d3.scaleLinear()
      .domain([0, d3.max(top3Products, d => d[active])]).nice()
      .range([height, 0])

    // Add bars into chart
    chart
      .selectAll('rect')
      .data(top3Products)
      .join('rect')
        .attr('x', d => x(d.productName))
        .attr('y', d => y(d[active]))
        .attr('width', x.bandwidth())
        .attr('height', d => y(0) - y(d[active]))
        .attr('fill', '#304ffe')

    // Add labels into chart
    chart
      .select(".labels")
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .selectAll('text')
      .data(top3Products)
      .join('text')
        .text(d => d[active].toFixed(0))
        .attr('x', d => x(d.productName) + x.bandwidth() / 2)
        .attr('y', d => y(d[active]) - 5)
  }, [active, data])

  return (
    <div>
      <h2>Top 3 Purchased Products</h2>
      <Toggle 
        choices={choices} 
        active={active} 
        handleActive={setActive} 
      />
      <svg ref={d3Container}>
        <g className="chart">
          <g className="x-axis" />
          <g className="labels" />
        </g>
      </svg>
    </div>
  )
}

export default TopProducts
