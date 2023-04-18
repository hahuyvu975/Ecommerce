import React from 'react'
import { Link } from 'react-router-dom'
import './ProductItem.css'

function ProductItem({product}) {
  console.log(product.images)
  return (
    <div className='product_card'>
      <img src={product.images} alt="" />

      <div className='product_box'>
        <h2>{product.title}</h2>

        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <div className='row_btn'>
        <Link id="btn_buy" to = "#!">
          BUY
        </Link>
        <Link id="btn_view" to = {`/detail/${product._id}`}>
          VIEW
        </Link>

      </div>
      </div>
  )
}

export default ProductItem