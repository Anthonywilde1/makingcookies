const express = require('express');
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require('mongoose');
const exphbs  = require('express-handlebars');

const postRouter = require('./routes/posts_routes');
const pageRouter = require("./routes/pages_routes");
const authRouter = require("./routes/auth_routes");

const port = process.env.port || 3009;

const app = express();
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 60000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(express.json());
app.use(express.urlencoded({
extended:true
}));


const dbConn = 'mongodb://localhost/blog_app_auth'
// Set three properties to avoid deprecation warnings:
// useNewUrlParser: true
// useUnifiedTopology: true
// useFileAndModify: false
mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    });
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use("/",pageRouter)

app.use('/posts', postRouter);
app.use('/user', authRouter);

app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
});