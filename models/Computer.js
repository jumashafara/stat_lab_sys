const mongoose = require('mongoose')

const computerSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: [true, "A computer must have a name"]
    },
    details:{
        type:String,
        required: true,
        default: 'Not available'
    },
    date_added: {
        type: Date,
        required: true,
        default: Date.now()
    },
    booker_id: {
        type: String,
        default: ''
    }

},

);

computerSchema.statics.handleUpdate = async function(old_name, new_name){
        await this.updateOne({name: old_name}, {name: new_name}) 
}



const Computer = mongoose.model('computer', computerSchema)
module.exports = Computer