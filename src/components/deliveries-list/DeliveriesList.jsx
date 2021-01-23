import React from 'react'
import styled from 'styled-components'

function DeliveriesList({ data }) {
  const groupedData = data.reduce((acc, current) => {
    if (acc[current.deliveryDate] === undefined) {
      acc[current.deliveryDate] = {}
    }
    if (acc[current.deliveryDate][current.supplier] === undefined) {
      acc[current.deliveryDate][current.supplier] = []
    }
    acc[current.deliveryDate][current.supplier].push(current)
    return acc
  }, {})

  return (
    <div>
      <h2>List of Deliveries</h2>
      {Object.entries(groupedData).map(groupedDate => (
        <DateBox>
          <StyledDate>{ groupedDate[0] }</StyledDate>
          {Object.entries(groupedDate[1]).map(groupedSuppliers => (
            <SupplierBox>
              <h4>{ groupedSuppliers[0] }</h4>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                {groupedSuppliers[1].map(order => (
                  <tr>
                    <td>{ order.productName }</td>
                    <td>{ order.quantity }</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </SupplierBox>
          ))}
        </DateBox>
      ))}
    </div>
  )
}

export default DeliveriesList

const DateBox = styled.div`
  div:first-of-type {
    margin-left: 0;
  }

  div:last-of-type {
    margin-right: 0;
  }
`

const StyledDate = styled.h4`
  border-left: 3px solid #304ffe;
  margin: 20px 0 8px 0;
  padding-left: 8px;
`

const SupplierBox = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  display: inline-block;
  margin: 8px;
  padding: 16px;
  vertical-align: top;
`

const Table = styled.table`
  border-collapse: collapse;

  th, td {
    font-size: 14px;
    text-align: left;
  }

  th {
    border-bottom: 1px solid gray;
    padding: 0 12px 8px 0;
    font-weight: 400;

    &:last-of-type {
      padding-right: 0;
    }
  }

  tr {
    &:first-of-type {
      td {
        padding-top: 8px;
      }
    }

    td:last-of-type {
      text-align: center;
    }
  }
`