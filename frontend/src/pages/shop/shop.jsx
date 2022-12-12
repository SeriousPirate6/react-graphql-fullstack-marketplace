import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Product } from "./product";
import "./shop.css";

const QUERY_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      ... on ProductSuccessfulResult {
        success {
          id
          name
          price
          cartQnt
          image {
            mime
            data
          }
        }
      }
    }
  }
`;

function GetAllProducts() {
  const { data, loading, error } = useQuery(QUERY_ALL_PRODUCTS);
  if (loading) {
    return (
      <div className={"text-center mt-4"}>
        <div className={"spinner-border"} role="status"></div>
      </div>
    );
  }
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }

  return (
    <div className={"container shop"}>
      <div className={"shopTitle"}>
        <h1 className={"text-center mt-4"}>Products List</h1>
      </div>
      <div className={"products"}>
        {data &&
          data.products &&
          data.products.success &&
          data.products.success.map((product) => (
            <Product data={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}

export default GetAllProducts;
