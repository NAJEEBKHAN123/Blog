const express = require('express')
const dbConnection = require('./lib/db')
const cors = require('cors')

const app = express();


const PORT = process.env.PORT || 5000

//db connection
dbConnection()

//middleware
app.use(cors());
app.use(express.json())



app.get('/', (req, res) =>{
    res.send("Home Page")
})


app.listen(PORT, () =>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})