import cors from "cors";
import express, { Express } from "express";
import session from "express-session";
import { userRouter } from "./router/User";
import { productRouter } from "./router/Product";
import {readFile} from "fs";
import {cartRouter} from "./router/Cart";

export const app = express();


app.use(session({
    secret : "very secret",
    resave : false,
    saveUninitialized : true
}));

app.use(cors({
    origin: true,
    credentials : true,
}));

app.use(express.json());

app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/cart",cartRouter)

/* uncomment to be create build version using command "npm run build"
import * as path from "path";

app.use(express.static(path.join(__dirname, '../../client/build')));


app.get('/*', (req : express.Request, res : express.Response) => {

    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));

});

 */