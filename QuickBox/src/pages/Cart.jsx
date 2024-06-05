import React, { useEffect, useState } from 'react';
import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const loginState = localStorage.getItem("isLoggedIn");
  const userId = JSON.parse(localStorage.getItem("user")).id || {};
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

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
      setCartItems(data);

      let subTotal = 0;
      data.forEach((item) => {
        subTotal += item.price * item.quantity;
      });
      setTotal(subTotal);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const isCartEmpty = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
    } else {
      navigate("/thank-you");
    }
  };

  const handleUpdateCartAmount = async (event, itemId) => {
    const newAmount = parseInt(event.target.value, 10);
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newAmount } : item
    );
    setCartItems(updatedCartItems);

    const updatedTotal = updatedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(updatedTotal);

    try {
      const response = await fetch(`http://localhost:3000/api/carrito/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: itemId,
          quantity: newAmount
        })
      });

      if (!response.ok) {
        throw new Error('Response not ok');
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);

    const updatedTotal = updatedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(updatedTotal);

    try {
      const response = await fetch(`http://localhost:3000/api/carrito/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Response not ok');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SectionTitle title="Cart" path="Home | Cart" />
      <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
        <div className='lg:col-span-8'>
          <CartItemsList
            cartItems={cartItems}
            handleRemoveItem={handleRemoveItem}
            handleUpdateCartAmount={handleUpdateCartAmount}
            total={total}
          />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals total={total} />
          {loginState ? (
            <button onClick={isCartEmpty} className='btn bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8'>
              order now
            </button>
          ) : (
            <Link to='/login' className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8'>
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;