import React, { useEffect, useState } from 'react'
import CartItem from './CartItem';

const CartItemsList = ({ cartItems, handleRemoveItem, handleUpdateCartAmount }) => {

  return (
    <>
      {cartItems.map((item) => {
        return <CartItem onDelete={handleRemoveItem} onEdit={handleUpdateCartAmount} key={item.id} cartItem={item} />;
      })}
    </>
  )
}

export default CartItemsList;