import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import setupRouter from "./routes/pokemonRoutes.js";

// MAKE IT AN ASYNC FUNCTION
export default async function createServer() {

    // Configure lowdb to write to JSONFile. This will be our "database"
    const adapter = new JSONFile("db.json");
    const db = new Low(adapter);

    await db.read();

    db.data = db.data ||= { pokemons: [] };

    await db.write();

    const app = express();

    app.use(express.json());

    app.use("/pokemon", setupRouter(db));

    return app;
};