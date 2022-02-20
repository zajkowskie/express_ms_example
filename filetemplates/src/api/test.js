const Microservice_nameService = require("../services/microservice_name-service");
const UserAuth = require('./middlewares/auth');

module.exports = (app) => {
    
    const service = new Microservice_nameService();

    app.post('/',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { body } = req.body;
        try {
           // api logic
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }

    });
       
    app.get('/',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { body } = req.body;
        try {
           // api logic
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
        
    });

    app.put('/',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { body } = req.body;
        try {
           // api logic
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
        
    });

    app.delete('/',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { body } = req.body;
        try {
           // api logic
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
        
    });
     
}