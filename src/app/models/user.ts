export class User {

    constructor(userId: string, provider: string) {
        this.userId = userId;
        this.provider = provider;
    }

    userId: string;
    provider: string;
}
