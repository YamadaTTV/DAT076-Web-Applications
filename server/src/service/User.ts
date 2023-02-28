import {User} from "../model/User";
import {promises} from "dns";

export interface IUserService {
    //Get all users in system
    getUsers() : Promise<Array<User>>;

    //Add a new user to the system
    addUser(username: string, email: string, password: string) : Promise<User>;

    //check if user exist, if it does return true.
    userExists(id: number) : Promise<boolean>;

    //Delete the user, if successful return true.
    deleteUser(username: string, password: string) : Promise<boolean>;

    //Login the user, if sucessful return true.
    loginUser(username: string, password: string) : Promise<boolean>;
}

class UserService implements IUserService {
    users : Array<User> = [];
    userIndex = 0;

    async getUsers() : Promise<Array<User>>{
        return this.users;
    }

    async addUser(username: string, email: string, password: string) : Promise<User>{
        const user = new User(this.userIndex+1,username,email,password);
        this.users.push(user);
        this.userIndex += 1;
        return user;
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
        let index = 0
        for(const user of this.users){
            if(user.username==username){ break }
            index += 1
        }
        if(this.users[index].username == username && this.users[index].password == password){
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }

    async loginUser(username: string, password: string) : Promise<boolean>{
        let index = 0
        for(const user of this.users){
            if(user.username==username){ break }
            index += 1
        }
        if(this.users[index].username == username && this.users[index].password == password){
            return true;
        }
        return false;
    }
}

export function makeUserService() : IUserService {
    return new UserService();
}

