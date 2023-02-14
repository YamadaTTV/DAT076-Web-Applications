import {IUserService, makeUserService} from "../../src/service/User";
import {User} from "../../src/model/User";

let userService : IUserService;
let testUsers : Array<User>;

beforeAll( () => {
    testUsers = [new User(1, "rassta","rassta@chalmers.se","123"),
                 new User(2,"mphu","mphu@chalmers.se","456"),
                 new User(3,"liamm","liamm@chalmers.se","789")]
    }
)

beforeEach( () => { userService = makeUserService()})

test("Test addUser", async () => {
        let users = await userService.getUsers()
        expect(users).toEqual([])
        await userService.addUser(testUsers[0].username,testUsers[0].email,testUsers[0].password)
        users = await userService.getUsers()
        expect(users.find((user : User) => user.id === testUsers[0].id)).toBeTruthy()
    }
)

test("Test creating a single user", async () => {
        await userService.addUser(testUsers[0].username,testUsers[0].email,testUsers[0].password)
        const users = await userService.getUsers()
        expect(users.find((user : User) => user.username === testUsers[0].username)).toBeTruthy()
        expect(users.find((user : User) => user.id === testUsers[0].id)).toBeTruthy()
        expect(users.find((user : User) => user.id === testUsers[1].id)).toBeFalsy()
    }
)

test("Test creating multiple users", async () => {
        await userService.addUser(testUsers[0].username,testUsers[0].email,testUsers[0].password)
        await userService.addUser(testUsers[1].username,testUsers[1].email,testUsers[1].password)
        await userService.addUser(testUsers[2].username,testUsers[2].email,testUsers[2].password)
        const expected = [
            {
                "id": 1,
                "username": "rassta",
                "email": "rassta@chalmers.se",
                "password": "123"
            },
            {
                "id": 2,
                "username": "mphu",
                "email": "mphu@chalmers.se",
                "password": "456"
            },
            {
                "id": 3,
                "username": "liamm",
                "email": "liamm@chalmers.se",
                "password": "789"
            }
        ]
        const users = await userService.getUsers()
        expect(users).toEqual(expected)
    }
)

test("Test userExists", async () => {
        await userService.addUser(testUsers[0].username,testUsers[0].email,testUsers[0].password)
        await userService.addUser(testUsers[1].username,testUsers[1].email,testUsers[1].password)
        expect(await userService.userExists(1)).toBeTruthy()
        expect(await userService.userExists(2)).toBeTruthy()
        expect(await userService.userExists(3)).toBeFalsy()
    }
)


test("Test deleteUser", async () => {
        await userService.addUser(testUsers[0].username,testUsers[0].email,testUsers[0].password)
        await userService.addUser(testUsers[1].username,testUsers[1].email,testUsers[1].password)
        await userService.addUser(testUsers[2].username,testUsers[2].email,testUsers[2].password)
        const expected = [
            {
                "id": 2,
                "username": "mphu",
                "email": "mphu@chalmers.se",
                "password": "456"
            },
            {
                "id": 3,
                "username": "liamm",
                "email": "liamm@chalmers.se",
                "password": "789"
            }
        ]
        await userService.deleteUser(testUsers[0].username,testUsers[0].password)
        await userService.addUser(testUsers[0].username,testUsers[0].email,testUsers[0].password)
        await userService.deleteUser(testUsers[0].username,testUsers[0].password)
        const users = await userService.getUsers()
        expect(users).toEqual(expected)
    }
)