const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

//___ROUTES___ 
app.get('/', async (req,res,next) => {

        return res.status(200).json({message : "OK!"});
   
});


app.listen(8000, () => {
    console.log('Gateway is Listening to Port 8000')
})