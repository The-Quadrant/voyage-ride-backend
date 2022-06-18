const express = require('express')
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const USERROUTE = require('./Routes/Users')
const AUTHROUTE =  require('./Routes/auth')
const app = express();

dotenv.config();
app.use(express.json());


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





// Creating all users Routes and Endpoints

app.use("/api/auth", AUTHROUTE);
app.use("/api/login", USERROUTE); 




app.listen( "8000", () => {
	console.log('Node runing on 8000')
})