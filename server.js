import express from 'express';
import cors from 'cors';
import movies from './movies.json' assert { type: 'json' }; // Let node server know that this is a json.
import fs from 'fs';
import { INITIAL_HTML } from './dist/index.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('dist'));

const getFilteredMovies = ({ movies = [], query = '' }) => {
  return query ? movies.
    filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())) :
    [];
}

const sendError = (res) => {
  res.status(500).send('Sorry, something went wrong');
}

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

    const initialData = getFilteredMovies({ movies, query });
    
    res.send(file.toString().replaceAll(
      '<!--app-->',
      `
        <script>window.__INITIAL_DATA__ = ${JSON.stringify({ movies: initialData })}</script>
        ${
          INITIAL_HTML['/search']({
            movies: initialData
          })
        }
      `
    ))}
  );
})

app.get('/api/search', (req, res) => {
  const { query: { query } } = req;

  res.send(getFilteredMovies({ movies, query }));
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// })

export default app;