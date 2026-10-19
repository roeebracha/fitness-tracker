//ports: 3000, 3001, 4000, 5000, 5500,8000,8080
const cors = require('cors');
const express = require("express");
const { connectDB } = require("./config/db");
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");


const app = express();
connectDB();
app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json());

app.get("/welcome", (req, res) => {
    res.send({ message: "Welcome To Node Js"})
})

app.use('/api/auth', authRoutes);

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`App is running on  port ${PORT}`);
});

