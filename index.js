const express = require('express'),
  morgan = require('morgan');
 
const app = express();

//Middleware

app.use(express.static('public'));
app.use(morgan('common'));

let topMovies = [{
  movie: 'The Godfather',
  director: 'Francis Ford Coppola'
},
{
  movie: 'Pulp Fiction',
  director: 'Quentin Tarantino'
},
{
  movie: 'The Shawshank Redemption',
  director: 'Frank Darabont'
},
{
  movie: 'The Good, the Bad and the Ugly',
  director: 'Sergio Leone'
},
{
  movie: 'Fight Club',
  director: 'David Fincher'
},
{
  movie: 'Gran Torino',
  director: 'Clint Eastwood'
},
{
  movie: 'Braveheart',
  director: 'Mel Gibson'
},
{
  movie: 'Star Wars',
  director: 'George Lucas'
},
{
  movie: 'Good Will Hunting',
  director: 'Gus Van Sant'
},
{
  movie: 'Apocalypse Now',
  director: 'Francis Ford Coppola'
}
];


// GET requests
app.get('/', (req, res) => {
res.send('Welcome to myFlix! The best movie database!');
});

app.get('/documentation', (req, res) => {
res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
res.json(topMovies);
});

// Error messages
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
console.log('Your app is listening on port 8080.');
});