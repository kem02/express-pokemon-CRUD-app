import express, { request } from "express";

export default function setupRouter(db){

    const router = express.Router();

    //GET
    router.get("/", function(_request, response){
        response.status(200).json({
            //Set our response to have a status of 200 (OK!) and to respond with JSON
            success: true,
            pokemons: db.data.pokemons,
        });
    });

    //GET
    router.get("/:pokemon", function(request, response){
        const pokemonName = request.params.pokemon;

        const findPokemonInArray = db.data.pokemons.find(singlePokemon => singlePokemon.name === pokemonName);

        response.status(200).json({
            success: true,
            pokemon: findPokemonInArray
        })
    })

    //POST
    router.post("/", function(request, response){
        console.log(request.body);
        db.data.pokemons.push({
            level: request.body.level,
            name: request.body.name,
        });

        db.write();

        response.status(200).json({
            success: true,
        });
        
    });

    //PUT
    router.put("/:pokemon", function(request, response){
        const pokemonName = request.params.pokemon;

        const findPokemonInArray = db.data.pokemons.findIndex(currentPokemon => currentPokemon.name === pokemonName);

        db.data.pokemons[findPokemonInArray].level = request.body.level;

        db.write();

        response.status(200).json({
            success: true,
        });

    });

    //DELETE
    router.delete("/:pokemon",(req, res) => {
        const pokemonName = req.params.pokemon;

        const index = db.data.pokemons.findIndex(currentPokemon => currentPokemon.name === pokemonName);

        db.data.pokemons.splice(index, 1);

        db.write();

        res.status(200).json({
            success: true,
            pokemons: db.data.pokemons,
        });

    });


    return router;
}