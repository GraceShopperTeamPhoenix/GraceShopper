import React from 'react'

export const Orders = props => {
  const {orders} = props.profile

  return (
    <div>
      {orders.map(order => {
        return (
          <div key={order.id}>
            <h4>Order # {order.id}</h4>
            {order.products.map(product => {
              return (
                <div key={product.id}>
                  <p>
                    {product.order_product.quantity} {product.name}
                    @ ${(product.price / 100).toFixed(2)}
                  </p>
                </div>
              )
            })}
            <hr />
          </div>
        )
      })}
    </div>
  )
}
