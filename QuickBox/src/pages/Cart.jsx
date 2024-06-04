import React, { useEffect, useState } from 'react'
import { CartItemsList, CartTotals, SectionTitle } from '../components'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const loginState = useState(localStorage.getItem("isLoggedIn"));
  const userId = useState(JSON.parse(localStorage.getItem("user")).id || {});
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

      let subTotal = 0;
      data.forEach((item) => {
        subTotal += item.price * item.quantity;
      }
      );

      setTotal(subTotal);
      setCartItems(data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  const isCartEmpty = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
    } else {
      navigate("/thank-you");
    }
  }

  const handleUpdateCartAmount = async (event) => {
    setItem({
      ...item,
      amount: event.target.value
    });
    try {
      const response = await fetch(`http://localhost:3000/api/carrito/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: item.id,
          quantity: event.target.value
        })
      });

      if (!response.ok) {
        throw new Error('Response not ok');
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleRemoveItem = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/carrito/${item.id}`, {
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
  }
  
  return (
    <>
      <SectionTitle title="Cart" path="Home | Cart" />
      <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
        <div className='lg:col-span-8'>
          <CartItemsList total={total} />
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
  )
}

export default Cart