const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const User = require("./models/user")


const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('62026c6121b58e935e9c90c7')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect("mongodb://127.0.0.1:27017/test").then(result=>{
  console.log("Connected");
  User.findOne().then(oneUser=>{
    if(!oneUser){
      const user = new User({name: "Mac", email: "mac@email.com", cart: {items: []}})
      user.save()
    }
  })
  app.listen(3000)
}).catch(err=>{
  console.log(err);
})
