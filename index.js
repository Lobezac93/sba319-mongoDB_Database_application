import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js"


// Load environment variables from a .env file if available
dotenv.config();


//connecting to mongodb server
try {
    mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to mongDB")
} catch (error) {
    console.log(error.message)
}

const app = express();

//middleware 
app.use(express.json())


//**============  ROUTES++================ */


//basic route
app.get('/',  (req, res) => {
    res.send("Welcome to the Chat room API")
})

//use routes
app.use('/api/users', userRouter)
app.use('/api/chats', chatRouter)

// Set a default port if process.env.PORT is undefined
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
