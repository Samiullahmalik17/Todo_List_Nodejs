const express = require("express");
const userRouter = require("./routes/userRoutes");
const todoRouter = require("./routes/todoRoutes");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/todo", todoRouter);

app.get("/", ( req ,res)=> {
    res.send("TODO API FROM SAMI ULLAH");
});

// const PORT = process.env.PORT || 5000 ;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database connected successfully...")
    app.listen(5000 , ()=>{
        console.log("server started on port 5000");
    });
})
.catch((error)=>{
    console.log(error);
})

