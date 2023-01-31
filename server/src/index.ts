import express from "express";
import {Express, Request, Response} from "express";


const app : Express = express();

app.use(express.json());

app.get("/",(req : Request, res: Response) => {
    res.status(200).send("hello stupid world!")
} );

app.listen(8080);