/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Filters,
  Pagination,
  ProductElement,
  SectionTitle,
} from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";

export const shopLoader = async ({ request }) => {

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

  return (
    <>
      <SectionTitle title="Shop" path="Home | Shop" />
      <div className="max-w-7xl mx-auto mt-5">
        {/* <Filters /> */}
        {productLoaderData.productsData.length === 0 && <h2 className="text-accent-content text-center text-4xl my-10">No products found for this filter</h2>}
        <div className="grid grid-cols-4 px-2 gap-y-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 shop-products-grid">
          {productLoaderData.productsData.length !== 0 &&
            productLoaderData.productsData.map((product) => (
              <ProductElement
                key={nanoid()}
                id={product.id}
                title={product.name}
                image={"http://localhost:5173" + product.img}
                price={product.price}
              />
            ))}
        </div>
      </div>

      <Pagination />
    </>
  );
};

export default Shop;
