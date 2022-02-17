const { CustomerModel, ProductModel, OrderModel, CartModel } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { APIError, BadRequestError } = require('../../utils/app-errors')


//Dealing with data base operations
class Microservice_nameRepository {

    // payment

    async Microservice_method(microservice_id){
        try{
            const microservice_names = await Microservice_model.find({microservice_id});        
            return microservice_names;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find microservice_names')
        }
    }
    
}

module.exports = Microservice_nameRepository;