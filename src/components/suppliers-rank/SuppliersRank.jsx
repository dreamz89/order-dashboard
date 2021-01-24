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

function SuppliersRank({ data }) {
  const [active, setActive] = useState('quantity')

  const d3Container = useRef(null)

  // Prepare data
  const groupedSuppliers = data.reduce((acc, current) => {
    const index = acc.findIndex((obj) => obj.supplier === current.supplier) 
    if (index !== -1) {
      acc[index].quantity += +current.quantity
      acc[index].volume += +current.price * +current.quantity
    } else {
      acc.push({
        supplier: current.supplier,
        quantity: +current.quantity,
        volume: +current.price * +current.quantity
      })
    }
    return acc
  }, [])

  const sortedData = groupedSuppliers.sort((a, b) => a[active] - b[active])

  useEffect(() => {
    if (data && d3Container.current) {
      // const time = d3.transition().duration(750)

      // Create chart area with margins
      const margin = { left: 120, right: 20, top: 50, bottom: 20 }
      const width = 560 - margin.left - margin.right,
          height = 200 - margin.top - margin.bottom
      
      const chart = d3.select(d3Container.current)
          .attr('height', height + margin.top + margin.bottom)
          .attr('width', width + margin.left + margin.right)
        .append('g')
          .attr('transform', 'translate(' + margin.left
            + ', ' + margin.top + ')')
  
      // Create x and y axis
      const x = d3.scaleLinear()
        .domain([0, d3.max(sortedData, d => d[active])])
        .range([0, width])

      const xAxis = d3.axisTop(x)
      chart.append('g')
        .call(xAxis)
        .attr('font-family', 'Montserrat')
        .attr('font-size', 14)

      const y = d3.scaleBand()
        .domain(d3.range(sortedData.length))
        .range([height, 0])
        .paddingInner(0.2)
        .paddingOuter(0.3)

      const yAxis = d3.axisLeft(y).tickFormat(i => sortedData[i].supplier)
      chart.append('g')
          .call(yAxis)
          .attr('font-family', 'Montserrat')
          .attr('font-size', 14)
  
      // Add bars into chart
      chart
        .selectAll('rect')
        .data(sortedData)
        .join('rect')
          .attr('x', x(0))
          .attr('y', (d, i) => y(i))
          .attr('width', d => x(d[active]) - x(0))
          .attr('height', y.bandwidth())
          .attr('fill', '#304ffe')
    }

  }, [active, data, d3Container.current]) // eslint-disable-line

  return (
    <div>
      <h2>Suppliers Ranking</h2>
      <Toggle 
        choices={choices} 
        active={active} 
        handleActive={setActive} 
      />
      <svg ref={d3Container} />
    </div>
  )
}

export default SuppliersRank