const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const router = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views', { noCache: true }); // apunta a nunjucks al directorio correcto para los templates

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))
app.use('/', router);

// app.get('/stylesheets/style.css', (req, res) => {
//   res.sendFile(__dirname + '/public/stylesheets/style.css')
// });

app.listen(3000, function(){
  console.log('Estas escuhando en el puerto 3000')
})
