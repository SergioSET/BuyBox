import React from "react";
import { Link } from "react-router-dom";

const ProductElement = ({ id, title, image, price }) => {
  return (
    <div className="max-w-2xl bg-100">
      <Link to={`/shop/product/${id}`}>
        <div className="rounded-lg max-w-sm bg-100">
          <div className="image-container">
            <img
              className="product-image"
              src={`${image}`}
              alt="product image"
            />
          </div>
          <div className="px-center pb-15">
            <h3 className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
              {title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-accent-content">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(price)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductElement;
