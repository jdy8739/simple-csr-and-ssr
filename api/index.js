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

    const initialData = getFilteredMovies({ movies, query }).map(getMovieTitle);
    
    res.send(file.toString().replaceAll(
      '<!--app-->',
      `
        <script>window.__INITIAL_DATA__ = ${JSON.stringify({ movies: initialData })}</script>
        ${
          INITIAL_HTML['/search'](initialData)
        }
      `
    ))}
  );
})

app.get('/details/:id', (req, res) => {
  const { id } = req.params;

  const movie = movies.find((movie) => movie.id === Number(id));

  res.send(movie);
})

app.get('/api/search', (req, res) => {
  const { query: { query } } = req;

  res.send(getFilteredMovies({ movies, query }).map(getMovieTitle));
})

app.listen((port), () => {
  console.log(`Example app listening on port ${port}`);
})

function getMovieTitle({ title }) {
  return title;
};

function getFilteredMovies({ movies = [], query = '' }) {
  return query ? movies.
    filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())) :
    [];
};

function sendError(res) {
  res.status(500).send('Sorry, something went wrong');
};

export default app;