const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Microservice_nameSchema = new Schema({
    microservice_id: String,
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('microservice_name', Microservice_nameSchema);