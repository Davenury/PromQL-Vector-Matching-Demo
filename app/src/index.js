const express = require('express')
const prom = require('prom-client')

const { metricsMiddleware } = require('./middlewares');
const { PokemonService } = require('./pokemon-service');

const app = express()

app.use(metricsMiddleware)
app.use(express.json())

const port = 3000

const pokemonService = new PokemonService()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/_meta/metrics', async (req, res) => {
    res.set('Content-Type', prom.register.contentType);
    res.end(await prom.register.metrics())
})

app.post('/pokemon', async (req, res) => {
  try {
    await pokemonService.catchPokemon(req.body.pokemonName, req.body.pokemonType)
    res.send('OK')
  } catch (e) {
    res.status(500).send({error: true})
  }
})

app.get('/pokemon', async (req, res) => {
  try {
    const pokemons = await pokemonService.getCaughtPokemons();
    res.json(pokemons)
  } catch (e) {
    res.status(500).send({error: true})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
