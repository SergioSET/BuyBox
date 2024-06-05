import { useEffect, useState } from "react";

const CartItem = ({ cartItem, onDelete, onEdit }) => {
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
            onChange={(event) => onEdit(event, item.id)}
          />
        </div>
        {/* REMOVE */}
        <button
          className="mt-2 link link-warning link-hover text-sm text-accent-content"
          onClick={() => onDelete(item.id)}
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
