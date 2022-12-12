import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "../cart/cart-item";
import "./cart.css";
import { useNavigate } from "react-router-dom";

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      ... on ProductSuccessfulResult {
        success {
          id
          name
          price
          cartQnt
          image {
            id
            mime
            data
          }
        }
      }
    }
  }
`;

export const Cart = () => {
  const { data } = useQuery(GET_ALL_PRODUCTS);
  const { getTotalCartAmount } = useContext(ShopContext);

  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  return (
    <div className={"cart"}>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {data &&
          data.products &&
          data.products.success.map((product) => {
            if (product.cartQnt > 0)
              return <CartItem data={product} key={product.id} />;
          })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p className="center">Subtotal: $ {totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h1>Your cart is empty</h1>
      )}
    </div>
  );
};
