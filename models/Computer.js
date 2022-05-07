const mongoose = require('mongoose')


const computerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "A computer must have a name"]
    },
    booker_id: {
        type: String,
        default: ''
    }

})

computerSchema.statics.handleUpdate = async function(old_name, new_name){
    // const computer = await this.findOne({name: old_name})
    // if(computer){
        await this.updateOne({name: old_name}, {name: new_name}) 
}



const Computer = mongoose.model('computer', computerSchema)
module.exports = Computer