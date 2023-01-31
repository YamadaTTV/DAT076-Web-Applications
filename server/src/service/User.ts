import {User} from "../model/User";

export interface IUserService {
    //Get all users in system
    getUsers() : Promise<Array<User>>;

    //Add a new user to the system
    addUser(username: string, email: string, password: string) : Promise<User>;

    //check if user exist, if it does return true.
    userExists(id: number) : Promise<boolean>;

}

class UserService implements IUserService {
    users : Array<User> = [];

    async getUsers() : Promise<Array<User>>{
        return this.users;
    }

    async addUser(username: string, email: string, password: string) : Promise<User>{
        const user = new User(this.users.length+1,username,email,password);
        this.users.push(user);
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
}

export function makeUserService() : IUserService {
    return new UserService();
}

