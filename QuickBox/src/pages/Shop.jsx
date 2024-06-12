import React, { useEffect } from 'react';
import {
  Filters,
  Pagination,
  ProductElement,
  SectionTitle,
} from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { useLoaderData, redirect } from "react-router-dom";
import { nanoid } from "nanoid";

export const shopLoader = async () => {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    return redirect("/login");
  }

  try {
    const response = await axios.get("http://localhost:3000/api/product");
    const data = response.data;
    return { productsData: data, productsLength: data.length, page: 1 };
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

const Shop = () => {
  const productLoaderData = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto mt-5">
        {productLoaderData.productsData.length === 0 && (
          <h2 className="text-accent-content text-center text-4xl my-10">
            No se encontraron productos con este filtro
          </h2>
        )}
        <div className="shop-products-grid">
          {productLoaderData.productsData.length !== 0 &&
            productLoaderData.productsData.map((product) => (
              <div key={nanoid()} className="shop-product-container">
                <ProductElement
                  id={product.id}
                  title={product.name}
                  image={"http://localhost:5173" + product.img}
                  price={product.price}
                />
              </div>
            ))}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default Shop;
