const express = require('express')
const dotenv = require("dotenv");
const mongoose = require('mongoose');

dotenv.config();

// Connect to mongodb in the .env files.

	// t1 and t2 is to calc Mongo Connect time
const t1 = new Date();

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    
  })

  .then(console.log('Mongo'))


}
main() .catch(err => console.log(err));
const t2 = new Date();
console.log(`${t2-t1} MSecs`);



const app = express();


app.listen( "5000", () => {
	console.log('Node runing on 5000')
})