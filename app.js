const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');//library of mongoose
const Ads =  require('./routes/allRoutes');




//connecting database
mongoose.connect( 'mongodb://localhost/Mydb', { useNewUrlParser: true }); //connect with mongo server
const db = mongoose.connection;
//Check Connection
db.once('open', () => {
    console.log('databse connected successfully');
});
// Check DB error
db.on('error', function(err){
    console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up routes
app.use('/api/olx', Ads);

app.use(express.static('./public/uploads'))
//port running
const PORT = process.env.PORT || 9192;
app.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`);
});