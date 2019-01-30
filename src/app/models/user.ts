export class User {

    constructor(user_id: string, provider: string) {
        this.user_id = user_id;
        this.provider = provider;
    }

    user_id: string;
    provider: string;
}
