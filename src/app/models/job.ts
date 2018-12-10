
export class Job {

    constructor(name: string, completed: boolean = false) {
        this.name = name;
        this.createdAt = new Date();
        this.completed = completed;
    }

    id: string;
    name: string;
    createdAt: Date;
    completed: Boolean;
}
