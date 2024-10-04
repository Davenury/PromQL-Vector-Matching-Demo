const appBaseUrl = "http://pokemon-service:3000"

const getPokemons = async () => {
    try {
        await fetch(`${appBaseUrl}/pokemon`)
    } catch(e) {
        console.log(e)
    }
}

const catchPokemon = async () => {
    const id = Math.floor(Math.random() * 1000)
    const pokemonData = await fetchPokemon(id)
    const pokemonName = pokemonData.name
    const type = pokemonData.types.map(it => it.type.name).sort().join('/')

    try {
        await fetch(`${appBaseUrl}/pokemon`, {
            method: "POST",
            body: JSON.stringify({pokemonName, pokemonType: type}),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (e) {
        console.log(e)
    }
}

const fetchPokemon = async (id) => {
    console.log('requesting poke-api')
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(r => r.json())
}

const main = async () => {
    while(true) {
        const random = Math.floor(Math.random() * 3)

        if (random % 3 == 0) {
            await catchPokemon()
        } else {
            await getPokemons()
        }

        await new Promise(r => setTimeout(r, 500))
    }
}

main()