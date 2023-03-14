
const {v4: uuid} = require("uuid");
const bcrypt = require("bcrypt");


console.log(`${uuid()}`)

// run this script for seeding uuid's 


//crypting/hashing for passwords imported


const bruh = async (pw) => { 

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(pw, salt)

  console.log(password);

}


bruh("Test1234")
