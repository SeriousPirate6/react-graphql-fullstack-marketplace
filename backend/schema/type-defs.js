const { gql } = require("apollo-server");

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Int!
    cartQnt: Int!
    image: Image
  }

  type Image {
    id: ID!
    mime: String!
    data: String!
  }

  type Query {
    products: ProductResult!
    product(id: ID!): Product!
    images: [Image!]!
    image(id: ID!): Image!
  }

  input UpdateQuantity {
    id: ID!
    cartQnt: Int!
  }

  input PlusMinusOne {
    id: ID!
    addOrRemove: addOrRemove!
  }

  type Mutation {
    updateQuantity(input: UpdateQuantity!): Product!
    plusMinusOneQnt(input: PlusMinusOne!): Product!
  }

  type ProductSuccessfulResult {
    success: [Product]!
  }

  type ProductErrorResult {
    error: String!
  }

  union ProductResult = ProductSuccessfulResult | ProductErrorResult

  enum addOrRemove {
    plus
    minus
  }
`;

module.exports = { typeDefs };
