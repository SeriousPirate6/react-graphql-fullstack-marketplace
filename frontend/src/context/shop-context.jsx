import React, { createContext, useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

export const ShopContext = createContext(null);

const QUERY_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      ... on ProductSuccessfulResult {
        success {
          id
          name
          price
          cartQnt
        }
      }
      ... on ProductErrorResult {
        error
      }
    }
  }
`;

const UPDATE_CART_QNT = gql`
  mutation UpdateProduct($input: UpdateQuantity!) {
    updateQuantity(input: $input) {
      id
      name
      cartQnt
    }
  }
`;

const ADD_REMOVE_CART_QNT = gql`
  mutation PlusMinusOneQnt($input: PlusMinusOne!) {
    plusMinusOneQnt(input: $input) {
      id
      name
      cartQnt
    }
  }
`;

const updateCart = (data) => {
  let cart = {};
  if (data.products) {
    for (let i = 1; i <= data.products.success.length; i++) {
      cart[i] = data.products.success[i - 1].cartQnt;
    }
  }

  return cart;
};

export const ShopContextProvider = (props) => {
  const [updateQuantity] = useMutation(UPDATE_CART_QNT);
  const [addRemoveQuantity] = useMutation(ADD_REMOVE_CART_QNT);
  const [cartItems, setCartItems] = useState({});

  const { data } = useQuery(QUERY_ALL_PRODUCTS);

  useEffect(() => {
    if (data) {
      setCartItems(() => updateCart(data));
    }
  }, [data]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        if (data.products.success) {
          let itemInfo = data.products.success.find(
            (product) => product.id == Number(item)
          );
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    addRemoveQuantity({
      variables: { input: { id: Number(itemId), addOrRemove: "plus" } },
    });
  };

  const removeFromCart = (itemId) => {
    addRemoveQuantity({
      variables: { input: { id: itemId, addOrRemove: "minus" } },
    });
  };

  const updateCartQnt = (itemId, cartQnt) => {
    updateQuantity({
      variables: { input: { id: Number(itemId), cartQnt: Number(cartQnt) } },
    });
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQnt,
    getTotalCartAmount,
  };
  console.log("CART ITEMS: " + JSON.stringify(cartItems));

  // component that wrap around other components (props.children)
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
