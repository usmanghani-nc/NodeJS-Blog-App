const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const DBURI = 'mongodb+srv://usman:test123@nodetuts.vmb25.mongodb.net/node-tuts?retryWrites=true&w=majority'

mongoose.connect(DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => app.listen(3000, () => console.log("server running")))
    .catch((error) => console.log("Error: ", error))


app.set("view engine", "ejs")

// middle ware 
// app.use((req, res, next) => {
//     console.log("middleware")
//     console.log("path : ", req.path)
//     next();
// })

// static files 
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))


app.get('/', (req, res) => {
    res.redirect('/blogs')
})


// Blog routes
app.use('/blogs', blogRoutes)


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

// 404
app.use((req, res) => {
    res.render('404', {
        title: '404'
    })
})