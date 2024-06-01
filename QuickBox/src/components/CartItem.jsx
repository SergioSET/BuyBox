import { useDispatch } from "react-redux";
import { removeItem, updateCartAmount } from "../features/cart/cartSlice";
import { useEffect, useState } from "react";


const CartItem = ({ cartItem }) => {
  const [item, setItem] = useState({});


  useEffect(() => {
    setItem({
      id: cartItem.id,
      title: cartItem.name,
      price: cartItem.price,
      image: cartItem.img,
      amount: cartItem.quantity,
    });
  }, [cartItem]);

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
    <article
      key={item.id}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={`http://localhost:5173${item.image}`}
        alt={item.title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium text-accent-content">{item.title}</h3>
        {/* COMPANY */}
        {/* <h4 className="mt-2 capitalize text-sm text-accent-content">
          Brand: { brandName }
        </h4> */}
        {/* <h4 className="mt-2 capitalize text-sm text-accent-content">
          Size: { selectedSize }
        </h4> */}
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text text-accent-content">Amount</span>
          </label>
          <input
            name="number"
            id="amount"
            className="mt-2 input input-bordered input-sm w-full max-w-xs text-accent-content"
            value={item.amount}
            onChange={(event) => handleUpdateCartAmount(event)}
          />
        </div>
        {/* REMOVE */}
        <button
          className="mt-2 link link-warning link-hover text-sm text-accent-content"
          onClick={() => handleRemoveItem()}
        >
          Remover
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto text-accent-content">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(item.price * item.amount)}</p>
    </article>
  );
};

export default CartItem;
