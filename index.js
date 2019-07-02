var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('vendor'));
// app.use(express.static('src/views'));
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render(
        'index',
        {
            title: 'EJS Page',
            list: ['a','b', 'c'],
        }
    );
});
app.get('/books', function(req, res){
    res.send('Hello Books' );
});
app.listen(port, function(err){
    console.log('Running Server on port '+port);
});