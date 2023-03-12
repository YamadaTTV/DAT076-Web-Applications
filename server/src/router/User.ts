import express, {query, Request, Response} from "express";
import {makeUserService} from "../service/User";
import {User} from "../model/User";
import * as requestTypes from "../requestTypes"
import * as responseTypes from "../responseTypes"
import session from "express-session";

export const userService = makeUserService();
export const userRouter = express.Router();

userRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<User> | String>
) => {
    try {
        const tasks = await userService.getUsers();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/", async (
    req: requestTypes.userRegisterRequest,
    res: Response<User | string>
) => {
    try {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        if (typeof(username) !== "string" || typeof(email) !== "string" || typeof(password) !== "string" ) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} ---username has type ${typeof(username)}, email has type ${typeof(email)} and password has type ${typeof(password)}`);
            return;
        }
        const newUser = await userService.addUser(username,email,password);
        res.status(201).send(newUser);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.delete("/", async(
    req: Request<{}, {}, {username : string, password : string}>,
    res: Response<String>
) => {
    try{
        let username = req.body.username;
        let password = req.body.password;

        if (typeof(username) !== "string" || typeof(password) !== "string" ) {
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} ---username has type ${typeof(username)} and password has type ${typeof(password)}`);
            return;
        }
        const deletedUser = await userService.deleteUser(username, password);
        res.status(201).send("Successfully deleted user " + deletedUser.valueOf());

    }catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/login", async(
    req: requestTypes.userLoginRequest,
    res: responseTypes.defaultResponse
) => {
    try{
        let username = req.body.username;
        let password = req.body.password;

        if (typeof(username) !== "string" || typeof(password) !== "string" ) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} ---username has type ${typeof(username)} and password has type ${typeof(password)}`);
            return;
        }
        const loginUser = await userService.loginUser(username, password);
        if(loginUser){
            req.session.user = await userService.getLoggedInUser(username, password)
            console.log("Test: " +req.session.user)
            res.status(202).send("Successfully logged in " + loginUser.valueOf());
        }
        else{
            res.status(203).send("Wrong username or password for user:" + loginUser.valueOf());
        }

    }catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.delete("/logout", async(
    req: requestTypes.defaultRequest,
    res: Response<string>
) => {
    try{
        if(req.session.user){
            req.session.destroy(e => {
                if (e) {
                    res.status(400).send('Unable to log out')
                } else {
                    res.status(200).send('Logout successful')
                }
            });
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.get("/loggedInUser", async (
    req: requestTypes.get,
    res: Response<User | string>
) => {
    try{
        if(req.session.user == null){
            res.status(210).send("No user logged in.")
        } else {
            res.status(200).send(req.session.user)
        }
        res.end();
    } catch (e: any){
        res.status(500).send(e.message)
    }
})


