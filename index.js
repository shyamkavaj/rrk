const express = require('express');
var bodyParser = require('body-parser');
const app = express();
// const User = require('./model/user')
// const Contact = require('./model/contact')
app.use(bodyParser.json());
const sequelize = require('./model/index');
const userCtrl = require('./controller/userCtrl');
const imageCtrl = require('./controller/imageCtrl');
const upload = require('./middleware/multer');

//important to implement
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {checkToken}  = require('./middleware/varify')

app.get('/',(req,res)=>res.send("hello world"  ))

app.get('/add',userCtrl.addUser)

app.get('/getUser',userCtrl.getUsers);

app.get('/getUser/:id',userCtrl.getUser);

app.post('/createUser',userCtrl.createUser);

app.put('/updateUser/:id',checkToken,userCtrl.updateUser)

app.delete('/deleteUser/:id',userCtrl.deleteUser)

app.post('/login/:id',userCtrl.userLogin)


//crud on image
app.post('/upload_img',upload.single('image'),imageCtrl.addImg)
app.post('/update-image/:id',upload.single('image'),imageCtrl.updateImg)


//to create table from model we use sync
//User.sync will drop the table if exist and create a new table
// User.sync({force:false}) 
// Contact.sync({force:true})
// User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
// User.sync({ force: true }) - This creates the table, dropping it first if it already existed
// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are

// await User.drop();
// console.log("User table dropped!");

app.listen(7777,()=>console.log("server is up"));