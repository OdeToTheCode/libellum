const router = require("express").Router();

const {ShoppingCart, Book} = require("../models")



async function getACart (req,res){
  try{
    const cart = await ShoppingCart.findOne({user_id: req.params.id}).populate(`books`);

    if(!cart){
      res.status(400).json({message:"could not pull cart with specified id"})
    }
    res.status(200).json(cart)
  }catch(err){
    res.status(500).json(err)
  }
}



async function addABook (req,res){
  try{

    const cart = await ShoppingCart.findOneAndUpdate(
      {user_id: req.params.id},
      {$push: {books: req.body} },
      {new: true}
    )

    if(!cart){
      res.status(400).json({message: "could not find cart to add book with specified id"});
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