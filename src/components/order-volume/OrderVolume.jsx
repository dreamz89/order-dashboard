import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

import Dropdown from '../../shared/Dropdown'

function OrderVolume({ data }) {
  const [productCategory1, setProductCategory1] = useState(null)
  const [productCategory2, setProductCategory2] = useState(null)
  const [supplier, setSupplier] = useState(null)

  // To populate supplier dropdown
  const supplierOptions = [{ value: 'All', label: '-- All Suppliers --'}]
  const supplierList = []
  data.forEach(order => {
    if (!supplierList.includes(order.supplier)) supplierList.push(order.supplier)
  })
  supplierList.forEach(supplier => supplierOptions.push({
    value: supplier,
    label: supplier
  }))

  const handleSelectSupplier = (item) => {
    if (item.value === 'All') {
      setSupplier(null)
    } else {
      setSupplier(item.value)
    }
  }

  // To populate category dropdown
  const mainCategoryOptions = [{ value: 'All', label: '-- All Main Categories --'}]
  const mainCategoryList = []
  data.forEach(order => {
    if (!mainCategoryList.includes(order.productCategory1)) mainCategoryList.push(order.productCategory1)
  })
  mainCategoryList.forEach(mainCategory => mainCategoryOptions.push({
    value: mainCategory,
    label: mainCategory
  }))

  const handleSelectMainCategory = (item) => {
    if (item.value === 'All') {
      setProductCategory1(null)
    } else {
      setProductCategory1(item.value)
    }
  }

  const subCategoryOptions = [{ value: 'All', label: '-- All Sub Categories --'}]
  const subCategoryList = []
  if (productCategory1 !== null) {
    const subCategoryGroup = data.filter(order => {
      return order.productCategory1 === productCategory1
    })
    subCategoryGroup.forEach(order => {
      if (!subCategoryList.includes(order.productCategory2)) subCategoryList.push(order.productCategory2)
    })
    subCategoryList.forEach(subCategory => subCategoryOptions.push({
      value: subCategory,
      label: subCategory
    }))
  }

  const handleSelectSubCategory = (item) => {
    if (item.value === 'All') {
      setProductCategory2(null)
    } else {
      setProductCategory2(item.value)
    }
  }
 
  // Filter and sort data
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
      <Dropdown
        options={supplierOptions} 
        handleSelect={handleSelectSupplier} 
      />
      <Dropdown
        options={mainCategoryOptions} 
        handleSelect={handleSelectMainCategory} 
      />
      <Dropdown
        disabled={productCategory1 === null}
        options={subCategoryOptions} 
        handleSelect={handleSelectSubCategory} 
      />
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
