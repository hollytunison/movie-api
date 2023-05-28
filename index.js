const express = require('express'),
morgan = require('morgan'),
  uuid = require('uuid'),
  app = express(),
  bodyParser = require('body-parser');
  
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

// middleware //
app.use(bodyParser.json());




let users = [
  {
    id: 1,
    name: "Tom",
    favoriteMovie: []
  },
  {
    id: 2,
    name: "Ted",
    favoriteMovie: []
  }
];

let movies = [
	{
		Title: 'Tombstone',
		Description:
			'Wyatt Earp and his brothers move to Tombstone, Arizona, where they take on a notorious gang of outlaws called The Cowboys.',
		Genre: {
			Name: 'Western',
			Description:
				'A genre of film set in the American Old West, often featuring cowboys, gunslingers, and law enforcement officials in conflict with each other or with Native Americans.',
		},
		Director: {
      Name: 'George Cosmatos',
      Bio: "George P. Cosmatos was a Greek-Italian film director and screenwriter. He was born on January 4, 1941, in Florence, Italy, to Greek parents. Cosmatos began his career as an assistant director in the Italian film industry before moving to the United States in the 1970s.",
      Birth: "1941",
      Death: "2005"
	},
    ImagePath: "https://www.imdb.com/title/tt0108358/mediaviewer/rm2107331584/?ref_=ext_shr_lnk",
    Featured: true
},
	{
		Title: '3:10 to Yuma',
		Description:
			"A small-time rancher agrees to hold a captured outlaw who's awaiting a train to go to court in Yuma. A battle of wills ensues as the outlaw tries to tempt the rancher into letting him go.",
		Genre: {
			Name: 'Western',
			Description:
				'A genre of film set in the American Old West, often featuring cowboys, gunslingers, and law enforcement officials in conflict with each other or with Native Americans.',
		},
      Director: {
        Name: 'James Mangold',
        Bio: "James Mangold is an American film director, screenwriter, and producer. He was born on December 16, 1963, in New York City, United States.",
        Birth: "1963",
    }},
	{
		Title: 'Lonesome Dove',
		Description:
			'Two former Texas Rangers, Gus McRae and Woodrow F. Call, decide to move cattle from the south to Montana, and embark on a dangerous and epic adventure.',
		Genre: {
			Name: 'Western',
			Description:
				'A genre of film set in the American Old West, often featuring cowboys, gunslingers, and law enforcement officials in conflict with each other or with Native Americans.',
		},
		Director: 'Simon Wincer',
	},
	{
		Title: 'Dances with Wolves',
		Description:
			'A Civil War soldier develops a relationship with a band of Lakota Indians. Attracted by the simplicity of their lifestyle, he chooses to leave his former life behind to be with them.',
		Genre: {
			Name: 'Western',
			Description:
				'A genre of film set in the American Old West, often featuring cowboys, gunslingers, and law enforcement officials in conflict with each other or with Native Americans.',
		},
		Director: 'Kevin Costner',
	},
	{
		Title: 'Open Range',
		Description:
			'A former gunslinger is forced to take up arms again when he and his cattle crew are threatened by a corrupt lawman.',
		Genre: {
			Name: 'Western',
			Description:
				'A genre of film set in the American Old West, often featuring cowboys, gunslingers, and law enforcement officials in conflict with each other or with Native Americans.',
		},
		Director: 'Kevin Costner',
	},
	{
		Title: 'Legends of the Fall',
		Description:
			'In early 20th-century Montana, three brothers and their father living on a remote ranch are affected by betrayal, history, love, nature, and war.',
		Genre: {
			Name: 'Drama',
			Description:
				'A genre of film that explores human emotions, relationships, and conflicts in a realistic or fictional setting.',
		},
	 Director: 'Edward Zwick',
	},
	{
		Title: 'No Country for Old Men',
		Description:
			'Llewelyn Moss stumbles upon a drug deal gone wrong and takes off with $2 million in cash, but soon finds himself pursued by the ruthless hitman Anton Chigurh.',
		Genre: {
			Name: 'Thriller',
			Description:
				'A genre of film that emphasizes suspense, tension, and excitement, often involving a protagonist in danger or on the run from a villain or dangerous situation.',
		},
		Director: 'Joel and Ethan Coen',
	},
];
           


// GET requests
app.get('/', (req, res) => {
res.send('Welcome to myFlix! The best movie database!');
});

app.get('/documentation', (req, res) => {
res.sendFile('public/documentation.html', { root: __dirname });
});


// Movie List
app.get('/movies', (req, res) => {
res.status(200).json(movies);
});

// Users
app.get('/users', (req, res) => {
  res.status(200).json(users);
  });


// Movie Title
app.get('/movie/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.Title === title);

  if (genre) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }
});

// Genre Name
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }
});

// Directors
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }
});

// CREATE New Users
app.post('/users', (req, res) => {
  const newUser = req.body;

  if(newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser) 
  } else {
    res.status(400).send('users need names')
  }
});

// UPDATE Users
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  }  else {
    res.status(400).send('no such user');
  }
});

// Post movies in favorites
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovie.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user's favorites`);
    } else {
        res.status(404).send('User not found.')
    }
});

// DELETE 
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
      user.favoriteMovie = user.favoriteMovie.filter(title => title!==movieTitle)
      res.status(200).send(`${movieTitle} has been removed from user's favorites`);
  } else {
      res.status(404).send('User not found.')
  }
}); 

// DELETE 
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
      users = users.filter(user => user.id != id);
      res.status(200).send(`User ${id} has been deleted`);
  } else {
      res.status(404).send('User not found.')
  }
}); 



// Error messages
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});

app.use(express.static('public'));

// listen for requests
app.listen(8080, () => console.log("listening on 8080"));