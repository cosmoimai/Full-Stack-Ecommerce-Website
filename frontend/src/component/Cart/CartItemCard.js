import React, { Fragment } from 'react'
import { addItemsToCart } from '../../actions/cartAction'
import "./CartItemCard.css"
import { Link } from 'react-router-dom'

const CartItemCard = ({item,deleteCartItems}) => {
  return (
  <div className='CartItemCard'>
    <img src={item.image} alt="ss" />
    <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price ₹${item.price}`}</span>
        <p onClick={()=> deleteCartItems(item.product)}>Remove</p>
    </div>
  </div>
)
}

export default CartItemCard