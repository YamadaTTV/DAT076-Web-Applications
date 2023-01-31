import express, {query, Request, Response} from "express";
import {makeUserService} from "../service/User";
import {User} from "../model/User";

const taskService = makeUserService();

export const userRouter = express.Router();

userRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<User> | String>
) => {
    try {
        const tasks = await taskService.getUsers();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/", async (
    req: Request<{}, {},{id: number, username: string, email: string, password: string}>,
    res: Response<User | string>
) => {
    try {
        let id = req.body.id;
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        if (typeof(id) !== "number" || typeof(username) !== "string" || typeof(email) !== "string" || typeof(password) !== "string" ) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- id has type ${typeof(id)}, username has type ${typeof(username)}, email has type ${typeof(email)} and password has type ${typeof(password)}`);
            return;
        }
        const newUser = await taskService.addUser(id,username,email,password);
        res.status(201).send(newUser);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});