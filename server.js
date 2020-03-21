//Modules Start
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
require('dotenv').config();
//Modules Start



//Globals Start
const app = express();
const port = process.env.PORT || 5000;
//Globals End




//Middleware Start
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
//Middleware End




//Mongoose Start
const uri = 'mongodb+srv://kaboo:123123nko@kaboo-dzvqk.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

const connection = mongoose.connection;
connection.once('open', function () {
    console.log('MongoDB is working');
});
//Mongoose End




//Routing Start
const authRouter = require("./routes/auth.route");
const postsRouter = require('./routes/posts.route');

app.use('/posts', postsRouter);

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/auth", authRouter);
//Routing End





app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'));
});

app.listen(port, () => {
    console.log('Server on port: ' + port);
})