const mongoose = require("mongoose");

const{Book, ShoppingCart, User} = require("../models")

const {v4: uuid} = require("uuid");

const db = "mongodb://127.0.0.1:27017/BooksDB"

try{
  mongoose  
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log(`connection to database: ${db} : success \n`);
  })

}catch(err){
  console.log(`ERROR CONNECTING TO DATABASE: ${err}`);
}


const seedUsers = [
  {
    first_name: "Bruh",
    last_name: "Moment",
    address: "2903 bruh st N",
    city: "Minneapolis",
    state: "MN",
    zip_code: "09324",
    email: "test@testing.com",
    password: "Test1234",
  },
]


const seedBooks = [
  {
    title:"Z-BRUH",
    author: "MoeFoe",
    ID:"W_hUEAAAQBAJ",
    price:"20.21",
    category: "Fiction",
  },
  {
    title:"B.R.U.H",
    author: "Markus Prime",
    ID:"AU-0DAEACAAJ",
    price:"23.64",
    category: "African Americans in art",
  },
]

// const seedShoppingCart = 
//   {
//     books: ["AU-0DAEACAAJ","W_hUEAAAQBAJ"]
//   }

const seedDB = async () => {
  try{
    console.log("attemping to seed db")

    const books = await Book.insertMany(seedBooks);
    

    const user = await User.insertMany(seedUsers);

    await ShoppingCart.create({books, user_id: user[0]._id});

  }catch(err){
    console.log(`Ran into some error seeding db: ${err}`);
  }
}

seedDB().then (()=> {
  mongoose.connection.close()
  console.log("seeding completed successfully...");
})
