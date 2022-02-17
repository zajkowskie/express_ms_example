const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req,res,next) => {
    return res.status(200).json({"msg": "Hello from microservice_name"})
})


app.listen(microservice_port, () => {
    console.log('microservice_name is Listening to Port microservice_port')
})