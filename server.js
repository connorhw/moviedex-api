require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
//const helmet = require('helmet')
const MOVIES = require('./moviedex.json')

console.log(process.env.API_TOKEN)
const app = express()

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(cors())
//app.use(helmet())


app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  next()
})


/*
function handleGetMovies(req, res) {
    let response = MOVIES;
    res
      .send(response)
}
*/
app.get('/movie', function handleGetMovies(req, res) {
  let response = MOVIES;
  if (req.query.genre) {
    response = response.filter(movie =>
        movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
      )
  }
  if (req.query.country) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
  }
  
  
  if (req.query.avg_vote) {
    response = response.filter(movie =>
      Number(movie.avg_vote) >= Number(req.query.avg_vote)
    )
  }
  
  res.json(response)
})

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
app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})


const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
  //console.log(`Server listening at http://localhost:${PORT}`)
})
