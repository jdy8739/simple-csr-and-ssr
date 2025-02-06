import express from 'express';
import cors from 'cors';
import movies from './movies.json' assert { type: 'json' }; // Let node server know that this is a json.

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/search', (req, res) => {
  const { query: { query } } = req;

  const filteredMovies = query ? movies.
    filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())) : [];

  res.send(filteredMovies);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})