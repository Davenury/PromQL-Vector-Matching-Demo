const prom = require('prom-client');

const caughtPokemonsCount = new prom.Counter({
    name: 'caught_pokemon',
    help: 'Number of caught pokemons',
    labelNames: ['pokemon_type']
})

class PokemonService {
    constructor() {}

    pokemons = [];

    catchPokemon = async (pokemonName, pokemonType) => {
        const random = Math.floor(Math.random() * 4 + 1);

        if (random % 4 == 0) {
            throw new Error();
        }

        await setTimeout(() => {}, random * 100);

        this.pokemons.push({ name: pokemonName, type: pokemonType })
        caughtPokemonsCount.inc({ pokemon_type: pokemonType })
    }

    getCaughtPokemons = async () => {
        const random = Math.floor(Math.random() * 4 + 1);

        if (random % 4 == 0) {
            throw new Error();
        }

        await setTimeout(() => {}, random * 100);

        return this.pokemons
    }
}

module.exports = {
    PokemonService
}
