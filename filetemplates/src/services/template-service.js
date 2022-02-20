const { Microservice_nameRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class microservice_nameService {

    constructor(){
        this.repository = new Microservice_nameRepository();
    }
    
    async GetOrders(customerId){
        try {
            const orders = await this.repository.Orders(customerId);
            return FormateData(orders)
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }
  
}

module.exports = microservice_nameService;