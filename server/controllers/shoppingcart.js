const router = require("express").Router();

const {ShoppingCart, Book} = require("../models")



async function getACart (req,res){
  try{
    const cart = await ShoppingCart.findOne({user_id: req.params.id}).populate(`books`);

    if(!cart){
      return res.status(400).json({message:"could not pull cart with specified id"})
    }
    res.status(200).json(cart)
  }catch(err){
    res.status(500).json(err)
  }
}



async function addABook (req,res){
  try{
    console.log(ShoppingCart)
    console.log(req.body)
    console.log(req.params.id)
    const book = req.body.book
    const cart = await ShoppingCart.findOneAndUpdate(
      {user_id: req.params.id},
      {$push: {books: {ID: book.id, title: book.title, author: book.authors[0], price: book.price, image: book.image} } },
      {new: true}
    )
    console.log(cart)

    if(!cart){
      return res.status(400).json({message: "could not find cart to add book with specified id"});
    }

    res.status(200).json(cart)

  }catch(err){
    res.status(500).json(err)
  }
}

async function RMBook (req,res) {
  try{

    const cart = await ShoppingCart.findOneAndUpdate(
      {user_id: req.params.userid},
      {$pull: {books: { _id: req.params.bookid }}},
      {new: true}
      )
    

    if(!cart){
      res.status(400).json({message:'could not find cart to delete book from'})
    }
    
    res.status(200).json(cart)

  }catch(err){
    res.status(500).json(err)
  }
}


module.exports = {getACart, addABook, RMBook};
//ISBN