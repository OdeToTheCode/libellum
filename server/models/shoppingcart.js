const {Schema, model} = require ("mongoose");
const User = require("./User")
const Book = require("./Book");
const shoppingCartSchema = new Schema(
  {

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    books: [
      Book.schema
    ]
    // items: {
    //   type: Array, 
    //   name: string,
    //   default: true,
    // itemDetails: new Schema ( 
    //   {
    //     id:{
    //       type: string,
    //       default: true,
    //       minLength: 1,
    //     },
    //     selfLink: {
    //       type: string,
    //       default: true,
    //       minLength: 1,
    //     },
    //     authors: {
    //       type: string,
    //       default: true,
    //       minLength: 1,
    //     },
    //     catagories: {
    //       type: string,
    //       default: true,
    //       minLength: 1,
    //     },
    //     description: {
    //       type: string,
    //       default: true,
    //       minLength: 1,
    //     },
    //     imageLinks: {
    //       type: Array,
    //       default: true,
    //       minLength: 0,
    //     }
    //   }
    // )
    // }
  }
);


  shoppingCartSchema.virtual("shoppingcardlength").get(function () {
    return this.books.length;
  });

  const shoppingCart = model("shoppingCart", shoppingCartSchema);

  module.exports = shoppingCart;

