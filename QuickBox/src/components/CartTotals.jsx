import React from 'react'
import { useSelector } from 'react-redux';

const CartTotals = ({ total }) => {
  const tax = total / 5;
  const shipping = 10000;

  return (
    <div className='card bg-base-200'>
      <div className='card-body'>
        {/* SUBTOTAL */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Subtotal</span>
          {/* <span className='font-medium'>${Math.round(total)}</span> */}
          <span className='font-medium'>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total)}</span>
        </p>
        {/* SHIPPING */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Envío</span>
          {/* <span className='font-medium'>${shipping}</span> */}
          <span className='font-medium'>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(shipping)}</span>
        </p>
        {/* Tax */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Impuestos y aranceles 20%</span>
          {/* <span className='font-medium'>${Math.round(tax)}</span> */}
          <span className='font-medium'>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(tax)}</span>
        </p>
        {/* Order Total */}
        <p className='flex justify-between text-sm mt-4 pb-2 text-accent-content'>
          <span>Total pedido</span>
          {/* <span className='font-medium'>${Math.round(total + shipping + tax)}</span> */}
          <span className='font-medium'>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total + shipping + tax)}</span>
        </p>
      </div>
    </div>
  )
}

export default CartTotals