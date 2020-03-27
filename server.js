const express = require('express')
const morgan = require('morgan')
const MOVIES = require('./moviedex.json')

const app = express()

app.use(morgan('dev'))


const validTypes = []

function handleGetMovies(req, res) {
    let response = MOVIES;
    res
      .send(response)
}
app.get('/movie', handleGetMovies)

//app.use(morgan('common')); // let's see what 'common' format looks like
//const movies = require('./moviestore.js')
/*
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Home Page!');
});

app.get('/movie/genre', (req, res) => {
    res
      .status(200)
      .send('genre page here')
})

app.use((req, res) => {
  res.send('server js is working!')
})
*/

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
