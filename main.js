import createServer from "./server.js";

const app = await createServer();

app.listen(8080, function(){
    console.log("App running on http://localhost:8080")
});