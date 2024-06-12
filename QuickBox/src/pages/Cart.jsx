import React, { useEffect, useState } from 'react';
import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const loginState = localStorage.getItem("isLoggedIn");
  let userId = -1;
  if (localStorage.getItem("isLoggedIn") == "true") {
    userId = JSON.parse(localStorage.getItem("user")).id || {};
  }
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const tax = total / 5;
  const shipping = 10000;

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
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    } else {
      getCartItems();
    }
  }, []);

  const isCartEmpty = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
    } else {
      try {
        fetch(`http://localhost:3000/api/order/create/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            subtotal: total + shipping + tax,
            cartItems: cartItems
          })
        });
      } catch (error) {
        console.error(error);
      }

      navigate("/thank-you");
    }
  };

  const handleUpdateCartAmount = async (event, itemId) => {
    let newAmount = 0;
    if (event.target.value < 1) {
      event.target.value = 1;
      newAmount = 1;
    } else {
      newAmount = parseInt(event.target.value, 10);
    }

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
      {cartItems.length === 0 ? (
        <div className='text-center mt-8'>
          <h2 className='text-2xl font-semibold'>Tu carrito está vacío</h2>
          <Link to='/shop' className='btn bg-blue-600 hover:bg-blue-500 text-white mt-4'>
            Ir a productos
          </Link>
        </div>
      ) : (
        <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
          <div className='lg:col-span-8'>
            <CartItemsList className="rounded-full bg-slate-300"
              cartItems={cartItems}
              handleRemoveItem={handleRemoveItem}
              handleUpdateCartAmount={handleUpdateCartAmount}
              total={total}
            />
          </div >
          <div className='lg:col-span-4 lg:pl-4'>
            <CartTotals total={total} />
            {loginState ? (
              <button onClick={isCartEmpty} className='btn bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8'>
                Ordena ahora
              </button>
            ) : (
              <Link to='/login' className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8'>
                Por favor inicie sesión
              </Link>
            )}
          </div>
        </div >
      )}
    </>
  );
};

export default Cart;