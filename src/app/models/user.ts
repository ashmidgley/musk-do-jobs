export class User {
    id: string;
    username: string;
    password: string;
    
    constructor(username = '', password = ''){
        this.username = username;
        this.password = password;
    }
}
