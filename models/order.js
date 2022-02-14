const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    items: [
        {
            product: {type: Object, required: true},
            quantity: {type: Number, required: true}
        }
    ],
    user: {
        userId: {required: true, type: Schema.Types.ObjectId},
        name: {type: String, required: true}
    }
})

module.exports = mongoose.model("Order", orderSchema)