const { productsList } = require("../products/products");
const { imageList } = require("../products/productsImages");
const _ = require("lodash");

const resolvers = {
  Query: {
    products: (parent, args) => {
      if (productsList) return { success: productsList };
      return { error: "Internal Server Error" };
    },
    product: (parent, args) => {
      if (productsList) {
        const id = args.id;
        const product = _.find(productsList, { id: Number(id) });
        return product;
      }
      return { error: "Internal Server Error" };
    },
    images: () => {
      if (imageList) {
        return imageList;
      }
    },
  },

  Mutation: {
    updateQuantity: (parent, args) => {
      const { id, cartQnt } = args.input;
      let productUpdated;
      productsList.forEach((product) => {
        if (product.id === Number(id)) {
          product.cartQnt = cartQnt;
          productUpdated = product;
        }
      });
      return productUpdated;
    },
    plusMinusOneQnt: (parent, args) => {
      const { id, addOrRemove } = args.input;
      let productUpdated;
      productsList.forEach((product) => {
        if (product.id === Number(id)) {
          if (addOrRemove.toString() === "minus" && product.cartQnt > 0)
            product.cartQnt--;
          if (addOrRemove.toString() === "plus") product.cartQnt++;
          productUpdated = product;
        }
      });
      return productUpdated;
    },
  },

  Product: {
    image: (parent) => {
      console.log(parent);
      return _.filter(imageList, (img) => img.id === Number(parent.id))[0];
    },
  },

  ProductResult: {
    __resolveType(obj) {
      if (obj.success) {
        return "ProductSuccessfulResult";
      }
      if (obj.error) {
        return "ErrorProductResult";
      }
      return null;
    },
  },
};

module.exports = { resolvers };
