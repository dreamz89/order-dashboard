import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

function OrderVolume({ data }) {
  const [productCategory1, setProductCategory1] = useState(null)
  const [productCategory2, setProductCategory2] = useState(null)
  const [supplier, setSupplier] = useState(null)

  const filters = {
    'productCategory1': productCategory1,
    'productCategory2': productCategory2,
    'supplier': supplier
  }

  const filteredData = data.filter(order => {
    return ['productCategory1', 'productCategory2', 'supplier'].every(key => {
      if (filters[key] === null) return true
      return filters[key] === order[key]
    })
  })

  const datedData = filteredData.reduce((acc, current) => {
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

  const d3Container = useRef(null)

  useEffect(() => {
    // Define spaces
    const margin = { left: 50, right: 30, top: 20, bottom: 50 }
    const width = 560 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom
    
    const svg = d3.select(d3Container.current)
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right)
    
    // Allow space for axis
    const chart = svg.select('.chart')
        .attr('transform', 'translate(' + margin.left
          + ', ' + margin.top + ')')

    // set point scale as dates are not continuous, and format date
    const parseDate = d3.timeParse("%m/%d/%Y")
    const x = d3.scalePoint()
      .domain(datedData.map(d => parseDate(d.deliveryDate)))
      .range([0, width])

    const xAxis = d3.axisBottom(x)
      .tickFormat(d3.timeFormat('%d %b'))
      .tickValues(datedData.map(d => parseDate(d.deliveryDate)))

    chart.select('.x-axis')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`)
      .attr('font-family', 'Montserrat')
      .attr('font-size', 14)

    const y = d3.scaleLinear()
      .domain([0, d3.max(datedData, d => d.volume)]).nice()
      .range([height, 0])

    const yAxis = d3.axisLeft(y)
    chart.select('.y-axis')
      .call(yAxis)
      .attr('font-family', 'Montserrat')
      .attr('font-size', 14)

    // generate line
    const line = d3.line()
      .x(d => x(parseDate(d.deliveryDate)))
      .y(d => y(d.volume))
    
    chart.select('.line')
      .datum(datedData)
      .attr('fill', 'none')
      .attr('stroke', '#304ffe')
      .attr('stroke-width', '2px')
      .attr('d', line)
      
  }, [productCategory1, productCategory2, supplier, datedData])

  return (
    <div>
      <h2>Total Order Volume</h2>
      <svg ref={d3Container}>
        <g className="chart">
          <g className="x-axis" />
          <g className="y-axis" />
          <path className="line" />
        </g>
      </svg>
    </div>
  )
}

export default OrderVolume
