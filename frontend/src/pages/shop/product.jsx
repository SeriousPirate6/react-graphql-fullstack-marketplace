import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, name, price, image } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];
  return (
    <div className={"product"}>
      <img src={"data:" + image.mime + ";base64," + image.data} />
      <div className={"description"}>
        <p>
          <b>{name}</b>
        </p>
        <p>
          <b>${price}</b>
        </p>
        <button className="addToCartBttn" onClick={() => addToCart(id)}>
          Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
        </button>
      </div>
    </div>
  );
};
