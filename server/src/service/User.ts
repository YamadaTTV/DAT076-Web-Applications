import {User} from "../model/User";
import {promises} from "dns";

export interface IUserService {
    //Get all users in system
    getUsers() : Promise<Array<User>>;

    //Add a new user to the system
    addUser(username: string, email: string, password: string) : Promise<boolean>;

    //check if user exist, if it does return true.
    userExists(id: number) : Promise<boolean>;

    //Delete the user, if successful return true.
    deleteUser(username: string, password: string) : Promise<boolean>;

    //Login the user, if sucessful return true.
    loginUser(username: string, password: string) : Promise<boolean>;

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

