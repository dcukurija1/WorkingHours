const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const authRouter = require("./routes/authRoutes");
app.use('/auth', authRouter);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.get("/",  (req, res) => {
	console.log("was here");
	res.send("was here");
});