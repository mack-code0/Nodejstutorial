const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  cart: {
    items: [
      {
        productId: {type: Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, required: true}
      }
    ]
  }
})

userSchema.methods.addToCart = function(product){
  const newCartItems = this.cart.items
  const prodIndex = this.cart.items.findIndex(p=>p.productId.toString()===product._id.toString())
  if(prodIndex>=0){
    console.log(prodIndex);
    newCartItems[prodIndex].quantity++
  }else{
    newCartItems.push({productId: product._id, quantity: 1})
  }
  this.cart.items = newCartItems
  return this.save()
}


userSchema.methods.deleteCart = function(prodId){
  let newCartItems = [...this.cart.items]
  const getProdIndex = newCartItems.findIndex(p=>p.productId.toString()===prodId.toString())
  if(newCartItems[getProdIndex].quantity>1){
    newCartItems[getProdIndex].quantity --
  }else{
    newCartItems = this.cart.items.filter(p=>p.productId.toString()!==prodId.toString())
  }
  this.cart.items = newCartItems
  return this.save()
}

// userSchema.methods.postOrder = function(){
//   return this.populate("cart.items.productId", "-userId -__v")
//   .then(result=>{
//     const newOrder = result.cart.items.map(p=>{
//       return {product: {...p.productId._doc}, quantity: p.quantity}
//     })
//     console.log(newOrder);
//     const order = new orderModel({items: newOrder, user: {userId: this._id, name: this.name}})
//     order.save()
//     return result
//   })
// }

module.exports = mongoose.model("User", userSchema)