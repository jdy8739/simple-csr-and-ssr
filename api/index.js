import express from 'express';
import cors from 'cors';
import movies from '../movies.json' assert { type: 'json' }; // Let node server know that this is a json.
import fs from 'fs';
import { INITIAL_HTML } from '../dist/index.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  fs.readFile('index.html', (error, file) => {
    if (error) {
      return sendError(res);
    }

    res.send(file.toString().replaceAll(
        '<!--app-->',
        INITIAL_HTML['/']
      ))
    }
  );
})

app.get('/search', (req, res) => {
  fs.readFile('index.html', (error, file) => {
    if (error) {
      return sendError(res);
    }

    const { query: { query } } = req;

    const initialData = getFilteredMovies({ movies, query }).map(getMovieIdWithTitle);

    const serversideHTML = getServersideHTML({ file, initialData, pathname: '/search' });
    
    res.send(serversideHTML);
  });
})

app.get('/details/:id', (req, res) => {
  fs.readFile('index.html', (error, file) => {
    if (error) {
      return sendError(res);
    }

    const { params: { id } } = req;

    const initialData = getMovieDetails({ movies, id });
    
    const serversideHTML = getServersideHTML({ file, initialData, pathname: '/details/:id' });

    res.send(serversideHTML);
  });
})

app.get('/api/search', (req, res) => {
  const { query: { query } } = req;

  res.send(getFilteredMovies({ movies, query }).map(getMovieIdWithTitle));
})

app.get('/api/details/:id', (req, res) => {
  const { params: { id } } = req;

  const movie = getMovieDetails({ movies, id });

  res.send(movie);
})

app.listen((port), () => {
  console.log(`Example app listening on port ${port}`);
})

/** get movie id with title */
function getMovieIdWithTitle({ id, title }) {
  return { id, title };
};

/** filter movies by the search query */
function getFilteredMovies({ movies = [], query = '' }) {
  return query ? 
    movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())) :
    [];
};

/** get movie details by id */
function getMovieDetails({ movies, id }) {
  return movies.find((movie) => movie.id === Number(id));
};

/** generate serverside HTML */
function getServersideHTML({ file, initialData, pathname }) {
  const serversideHTML = INITIAL_HTML[pathname](initialData);

  const serversideScript = 
    `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script>`;

  return file.toString().replaceAll(
    '<!--app-->',
    `
      ${serversideScript}
      ${serversideHTML}
    `
  )
}

function sendError(res) {
  res.status(500).send('Sorry, something went wrong');
};

export default app;