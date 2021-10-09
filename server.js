const express = require('express');
const dbConfig = require('./config/db.config');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.get('/', (req,res) =>{
    res.json({"message": "welcome to houseItems. Keep track of your household items"});
});

const port = 3000;

require('./app/routes/note.routes')(app);

app.listen(port, ()=>{
    console.log(`Server is listening ${port} on posrt`);
});

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
})
.then(()=>{
    console.log("Connected to db");
})
.catch(err=> {
    console.log("Could not connect", err);
});





