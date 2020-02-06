const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const uri = 'mongodb+srv://kaboo:123123nko@kaboo-dzvqk.mongodb.net/test?retryWrites=true&w=ma' +
        'jority'
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

const connection = mongoose.connection;
connection.once('open', function () {
    console.log('MongoDB is working');
});

const authRouter = require("./routes/auth.route");
const postsRouter = require('./routes/posts.route');

app.use('/posts', postsRouter);
app.use(passport.initialize());

require("./config/passport")(passport);
app.use("/auth", authRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'));
});

app.listen(port, () => {
    console.log('Server on port: ' + port);
})