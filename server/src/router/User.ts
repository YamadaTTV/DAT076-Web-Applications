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
        const id = req.body.id;
        if (typeof(id) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- description has type ${typeof(id)}`);
            return;
        }
        const newUser = await taskService.addUser(req.body.id,req.body.username,req.body.email,req.body.password);
        res.status(201).send(newUser);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});