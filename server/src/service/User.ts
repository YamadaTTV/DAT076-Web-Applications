import {User} from "../model/User";
import {promises} from "dns";

export interface IUserService {
    /** Get all the users from the server, not to be used in the production build
     *  @param n/a
     *  @return user[] - returns an array with all the users in the server
     * */
    getUsers() : Promise<Array<User>>;

    /** Register a new user and return status of registration.
     *  @param username,email,password - the desired username, email and password of the new user.
     *  @return boolean - returns true if the user was created correctly, or false if username or email is already in use
     * */
    addUser(username: string, email: string, password: string) : Promise<boolean>;

    /** Checks if user with given id exists.
     * @param id - The id is used to find the user.
     * @return boolean -  returns true if a user with the id exists, false otherwise.
     * */
    userExists(id: number) : Promise<boolean>;

    /** Deletes user with the given username if username and password match.
     * @param username,password - username and password of the user that wants to remove their account.
     * @return boolean - returns true if the user deleted their account, returns false if the user and password don't match or the deletion fails.
     * */
    deleteUser(username: string, password: string) : Promise<boolean>;

    /** Checks if a user successfully logs in by checking username and password.
     * @param username,password - username and password of the user that wants to log in.
     * @return boolean - returns true if the user has the correct username-password pair, returns false if the username and password don't match.
     * */
    loginUser(username: string, password: string) : Promise<boolean>;

    /** Used to get all information on user given that username and password match
     * @param username,password - username and password of the user to be gotten.
     * @return user|undefined - returns user if the correct username-password pair is given otherwise returns undefined.
     * */
    getLoggedInUser(username: string, password: string) : Promise<User | undefined>;
}

class UserService implements IUserService {
    users : Array<User> = [];
    userIndex = 0;

    async getUsers() : Promise<Array<User>>{
        return this.users;
    }

    async addUser(username: string, email: string, password: string) : Promise<boolean>{
        const findUser = this.users.find(user => user.email == email || user.username == username);
        if(findUser != null){
            return false;
        }
        const user = new User(this.userIndex+1,username,email,password);
        this.users.push(user);
        this.userIndex += 1;
        return true;
    }

    async userExists(id: number) : Promise<boolean>{
        for(const user of this.users){
            if(user.id == id){
                return true;
            }
        }
        return false;
    }

    async deleteUser(username: string, password: string) : Promise<boolean>{
        let user = this.users.find(user => user.username === username);
        let userIndex = this.users.findIndex(user => user.username===username);
        if(user == undefined){
            return false;
        }
        else{
            if(user.username == username && user.password == password){
                this.users.splice(userIndex, 1);
                return true;
            }
        }
        return false;
    }


    async loginUser(username: string, password: string) : Promise<boolean>{
        let user = this.users.find(user => user.username===username);
        if(user == undefined){
            return false;
        }
        else{
            if(user.username == username && user.password == password){
                return true;
            }
        }
        return false;
    }

    async getLoggedInUser(username: string, password: string) : Promise<User | undefined>{
        let user = undefined
        for(const searchUser of this.users){
            if(searchUser.username == username && searchUser.password == password){
                user = searchUser
            }
        }
        return user
    }
}

export function makeUserService() : IUserService {
    return new UserService();
}

