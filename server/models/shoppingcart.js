const {Schema, model} = require ("mongoose");
const User = require("./User")
const shoppingCartSchema = new Schema(
  {

    User: {
    type: String,
    id: User.id,
    },
    items: {
      type: Array, 
      name: String,
      default: true,
    itemDetails: new Schema ( 
      {
        id:{
          type: String,
          default: true,
          minLength: 1,
        },
        selfLink: {
          type: String,
          default: true,
          minLength: 1,
        },
        authors: {
          type: String,
          default: true,
          minLength: 1,
        },
        catagories: {
          type: String,
          default: true,
          minLength: 1,
        },
        description: {
          type: String,
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


shoppingCartSchema.virtual("shoppingCartLength")
  .get(function() { return `${this.items.length}`})
  .set(function (v) {
    const shoppingCartLength = v;
  })





const shoppingCart = model("shoppingCart", shoppingCartSchema);

module.exports = shoppingCart;

