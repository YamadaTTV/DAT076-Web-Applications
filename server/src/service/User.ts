import {User} from "../model/User";

export interface IUserService {
    //Get all users in system
    getUsers() : Promise<Array<User>>;

    //Add a new user to the system
    addUser(id: number, username: string, email: string, password: string) : Promise<User>;
}

class UserService implements IUserService {
    users : Array<User> = [];

    async getUsers() : Promise<Array<User>>{
        return this.users;
    }

    async addUser(id: number, username: string, email: string, password: string) : Promise<User>{
        const user = new User(id,username,email,password);
        this.users.push(user);
        return user;
    }
}

export function makeUserService() : IUserService {
    return new UserService();
}

