const {Schema, model} = require ("mongoose");

const shoppingCartSchema = new Schema(
  {
    items: {
      type: Array, 
      name: string,
      default: true,
    itemDetails: new Schema ( 
      {
        id:{
          type: string,
          default: true,
          minLength: 1,
        },
        selfLink: {
          type: string,
          default: true,
          minLength: 1,
        },
        authors: {
          type: string,
          default: true,
          minLength: 1,
        },
        catagories: {
          type: string,
          default: true,
          minLength: 1,
        },
        description: {
          type: string,
          default: true,
          minLength: 1,
        },
        imageLinks: {
          type: Array,
          default: true,
          minLength: 0,
        }
      }
    )
    }
  }
);

shoppingCartLength
  .virtual("getShoppingCartLength")
  .get(function () {
    return this.items.legnth;
  });

  const shoppingCart = model("shoppingCart", shoppingCartSchema);

  module.exports = shoppingCart;

