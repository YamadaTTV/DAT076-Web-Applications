import express, {Request, Response} from "express";
import {makeUserService} from "../service/User";
import {User} from "../model/User";
import * as requestTypes from "../requestTypes"
import * as responseTypes from "../responseTypes"

export const userService = makeUserService();
export const userRouter = express.Router();

/**
 * GET call to /user to get a list of all users. Only used for debugging.
 * req: requestTypes.get - An interface of requestType [see API configuration for the required arguments].
 * res: Response<Array<User>> - Returns an array with all users
 * Status codes:
 *      200: Successful request - Returned an array with all users
 *      500: Error - An error occurred
 */
userRouter.get("/", async (
    req: requestTypes.get,
    res: Response<Array<User> | String>
) => {
    try {
        const tasks = await userService.getUsers();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/**
 * POST call to /user to add a user.
 * req: requestTypes.userRegisterRequest - An interface of requestType [see API configuration for the required arguments].
 * res: Response<string> - Returned a response with a successful message or an error message explaining what went wrong
 * Status codes:
 *      201: Successful request - User created
 *      281: Error - User already exists
 *      400: Error - Type error
 *      500: Error - An error occurred
 */
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
        const response = await userService.addUser(username,email,password);
        if(response){
            res.status(201).send("User created");
        } else {
            res.status(281).send("User already exists");
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


/* not used
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
*/

/**
 * POST call to /user/login to login.
 * req: requestTypes.userLoginRequest - An interface of requestType [see API configuration for the required arguments].
 * res: responseTypes.defaultResponse - Returned a response with a successful message or an error message explaining what went wrong
 * Status codes:
 *      201: Successful request - Successfully logged in
 *      280: Error - Wrong username or password
 *      400: Error - Type error
 *      500: Error - An error occurred
 */
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
            res.status(220).send("Successfully logged in " + loginUser.valueOf());
        }
        else{
            res.status(280).send("Wrong username or password for user:" + loginUser.valueOf());
        }

    }catch (e: any) {
        res.status(500).send(e.message);
    }
});

/**
 * POST call to /user/logout to logout.
 * req: requestTypes.userLoginRequest - An interface of requestType [see API configuration for the required arguments].
 * res: responseTypes.defaultResponse - Returned a response with a successful message or an error message explaining what went wrong
 * Status codes:
 *      201: Successful request - Successfully logged out
 *      287: Error - Unable to log out
 *      500: Error - An error occurred
 */
userRouter.post("/logout", async(
    req: requestTypes.defaultRequest,
    res: Response<string>
) => {
    try{
        if(req.session.user){
            req.session.destroy(e => {
                if (e) {
                    res.status(287).send('Unable to log out')
                } else {
                    res.status(221).send('Logout successful')
                }
            });
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/**
 * GET call to /user/loggedInUser to get the User currently logged in.
 * req: requestTypes.userLoginRequest - An interface of requestType [see API configuration for the required arguments].
 * res: Response<User | string> - Returned the user currently logged in an error message explaining what went wrong
 * Status codes:
 *      215: Successful request - Returned user object of the currently logged in user
 *      282: Error - No user logged in
 *      500: Error - An error occurred
 */
userRouter.get("/loggedInUser", async (
    req: requestTypes.get,
    res: Response<User | string>
) => {
    try{
        if(req.session.user == null){
            res.status(282).send("No user logged in.")
        } else {
            res.status(215).send(req.session.user)
        }
        res.end();
    } catch (e: any){
        res.status(500).send(e.message)
    }
})


