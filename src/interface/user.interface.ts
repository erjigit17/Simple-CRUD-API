export interface IBaseUser {
    username: string;
    age: number;
    hobbies: string[];
}

export interface IUser extends IBaseUser {
    id: string;
}