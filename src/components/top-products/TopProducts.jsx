import React from 'react'

function TopProducts({ data }) {
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

  const top3ByQuantity = groupedProducts.sort((a,b) => b.quantity - a.quantity).slice(0,3)
  const top3ByVolume = groupedProducts.sort((a,b) => b.volume - a.volume).slice(0,3)

  return (
    <div>
      <h2>Top 3 Purchased Products</h2>
      
    </div>
  )
}

export default TopProducts
