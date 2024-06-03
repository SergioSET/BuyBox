import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const CartTotals = ({total}) => {
  const { amount } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(subTotal);
  const userId = JSON.parse(localStorage.getItem("user")).id || {};
  const tax = total / 5;
  const shipping = 50;

  console.log(total)

  // const calculateTotal = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/carrito/${userId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Response not ok');
  //     }

  //     const data = await response.json();
  //     let subTotal = 0;

  //     data.forEach((item) => {
  //       subTotal += item.price * item.quantity;
  //     });

  //     setTotal(subTotal);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   calculateTotal();
  // }, []);


  return (
    <div className='card bg-base-200'>
      <div className='card-body'>
        {/* SUBTOTAL */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Subtotal</span>
          <span className='font-medium'>${Math.round(total)}</span>
        </p>
        {/* SHIPPING */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Shipping</span>
          <span className='font-medium'>${shipping}</span>
        </p>
        {/* Tax */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Tax 20%</span>
          <span className='font-medium'>${Math.round(tax)}</span>
        </p>
        {/* Order Total */}
        <p className='flex justify-between text-sm mt-4 pb-2 text-accent-content'>
          <span>Order Total</span>
          <span className='font-medium'>${Math.round(total + shipping + tax)}</span>
        </p>
      </div>
    </div>
  )
}

export default CartTotals