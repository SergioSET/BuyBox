import React, { useEffect, useState } from 'react'
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const CartItemsList = () => {
  const userId = useState(JSON.parse(localStorage.getItem("user")).id || {});
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/carrito/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Response not ok');
      }

      const data = await response.json();

      // console.log(data)

      setCartItems(data);

    } catch (error) {
      console.error(error);
    }
  };

  // const calculateSubTotal = () => {
  //   let subTotal = 0;
  //   cartItems.forEach((item) => {
  //     subTotal += item.price * item.quantity;
  //   });
  //   console.log(subTotal);
  //   localStorage.setItem("subTotal", subTotal);
  //   console.log(localStorage.getItem("subTotal"));
  // };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.id} cartItem={item} />;
      })}
    </>
  )
}

export default CartItemsList