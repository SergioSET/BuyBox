import axios from "axios";
import React, { useState } from "react";
import {
  QuantityInput,
  SectionTitle,
  SelectSize,
  SingleProductRating,
  SingleProductReviews,
} from "../components";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

import { Link, useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  updateWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import { store } from "../store";

export const singleProductLoader = async ({ params }) => {
  const { id } = params;

  const response = await axios(`http://localhost:3000/api/product/${id}`);

  return { productData: response.data[0] };
};

const SingleProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const { wishItems } = useSelector((state) => state.wishlist);
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("user")).id || {});
  const dispatch = useDispatch();
  const loginState = useState(localStorage.getItem("isLoggedIn"));
  const [rating, setRating] = useState([
    "empty star",
    "empty star",
    "empty star",
    "empty star",
    "empty star",
  ]);

  const { productData } = useLoaderData();

  const product = {
    id: productData?.id,
    title: productData?.name,
    image: productData?.img,
    description: productData?.description,
    // rating: productData?.rating,
    price: productData?.price,
    // brandName: productData?.brandName,
    // amount: quantity,
    // selectedSize: size || productData?.availableSizes[0],
    // isInWishList:
    //   wishItems.find((item) => item.id === productData?.id + size) !==
    //   undefined,
  };

  for (let i = 0; i < productData?.rating; i++) {
    rating[i] = "full star";
  }

  // const addToWishlistHandler = async (product) => {
  //   try {
  //     const getResponse = await axios.get(
  //       `http://localhost:8080/user/${localStorage.getItem("id")}`
  //     );
  //     const userObj = getResponse.data;

  //     userObj.userWishlist = userObj.userWishlist || [];

  //     userObj.userWishlist.push(product);

  //     const postResponse = await axios.put(
  //       `http://localhost:8080/user/${localStorage.getItem("id")}`,
  //       userObj
  //     );

  //     store.dispatch(updateWishlist({ userObj }));
  //     toast.success("Product added to the wishlist!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const removeFromWishlistHandler = async (product) => {
  //   const getResponse = await axios.get(
  //     `http://localhost:8080/user/${localStorage.getItem("id")}`
  //   );
  //   const userObj = getResponse.data;

  //   userObj.userWishlist = userObj.userWishlist || [];

  //   const newWishlist = userObj.userWishlist.filter(
  //     (item) => product.id !== item.id
  //   );

  //   userObj.userWishlist = newWishlist;

  //   const postResponse = await axios.put(
  //     `http://localhost:8080/user/${localStorage.getItem("id")}`,
  //     userObj
  //   );

  //   store.dispatch(removeFromWishlist({ userObj }));
  //   toast.success("Product removed from the wishlist!");
  // };

  const addToCartHandler = async () => {
    const itemCart = {
      id_user: userId,
      id_product: productData?.id,
      quantity: quantity,
    };

    try {
      const response = await fetch('http://localhost:3000/api/carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemCart }),
      });

      if (response.ok) {
        toast.success("¡Producto añadido al carrito!");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto mt-5 gap-8">
        <div className="product-images flex justify-center lg:justify-end">
          <img
            src={`http://localhost:5173${productData?.img}`}
            className="w-64 lg:w-64 text-center border border-gray-600 cursor-pointer"
            alt={productData.name}
          />
        </div>
        <div className="single-product-content flex flex-col gap-y-5">
          <h2 className="text-5xl max-sm:text-3xl text-accent-content">
            {productData?.name}
          </h2>
          {/* <SingleProductRating rating={rating} productData={productData} /> */}
          <p className="text-3xl text">
            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(productData?.price)}
          </p>
          <div className="text-xl max-sm:text-lg text-accent-content">
            {parse(productData?.description)}
          </div>
          {/* <div className="text-2xl">
            <SelectSize
              sizeList={productData?.availableSizes}
              size={size}
              setSize={setSize}
            />
          </div> */}
          <div>
            <label htmlFor="Quantity" className="sr-only">
              {" "}
              Quantity{" "}
            </label>

            <div className="flex items-center gap-1">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>
          <div className="flex flex-row gap-x-2 max-sm:flex-col max-sm:gap-x">
            <button
              className="btn bg-blue-600 hover:bg-blue-500 text-white"
              onClick={() => {
                if (loginState) {
                  addToCartHandler();
                } else {
                  toast.error(
                    "You must be logged in to add products to the cart"
                  );
                }
              }}
            >
              <FaCartShopping className="text-xl mr-1" />
              Añadir al carrito
            </button>

            {/* {product?.isInWishList ? (
              <button
                className="btn bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  if (loginState) {
                    removeFromWishlistHandler(product);
                  } else {
                    toast.error(
                      "You must be logged in to remove products from the wishlist"
                    );
                  }
                }}
              >
                <FaHeart className="text-xl mr-1" />
                Remove from wishlist
              </button>
            ) : (
              <button
                className="btn bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  if (loginState) {
                    addToWishlistHandler(product);
                  } else {
                    toast.error(
                      "You must be logged in to add products to the wishlist"
                    );
                  }
                }}
              >
                <FaHeart className="text-xl mr-1" />
                Add to wishlist
              </button>
            )} */}
          </div>
          <div className="other-product-info flex flex-col gap-x-2">
            {/* <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Brand: {productData?.brandName}
            </div> */}
            {/* <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Gender: {productData?.gender}
            </div> */}
            {/* <div
              className={
                productData?.isInStock
                  ? "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
                  : "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
              }
            >
              In Stock: {productData?.isInStock ? "Yes" : "No"}
            </div> */}
            {/* <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              SKU: {productData?.productCode}
            </div>
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Category: {productData?.category}
            </div> */}
            <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
              Fecha de producción:{" "}
              {productData?.created_at?.substring(0, 10)}
            </div>
          </div>
        </div>
      </div>

      {/* <SingleProductReviews rating={rating} productData={productData} /> */}
    </>
  );
};

export default SingleProduct;
