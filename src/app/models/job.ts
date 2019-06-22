
export class Job {
    id: string;
    name: string;
    createdAt: Date;
    completed: Boolean;

    constructor(name: string, completed: boolean = false) {
        this.name = name;
        this.createdAt = new Date();
        this.completed = completed;
    }
}
