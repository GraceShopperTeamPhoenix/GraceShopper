import React from 'react'

export const SingleOrder = props => {
  const order = props.order
  let total = 0

  return (
    <div key={order.id}>
      <h4>Order # {order.id}</h4>
      {order.products.map(product => {
        let price = (product.order_product.price / 100).toFixed(2)
        total += price * product.order_product.quantity
        return (
          <div key={product.id}>
            <p>
              {product.order_product.quantity} {product.name} @ ${price}
            </p>
          </div>
        )
      })}
      Order Total: ${total.toFixed(2)}
      <hr />
    </div>
  )
}
