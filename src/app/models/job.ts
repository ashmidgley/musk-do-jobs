export class Job {
    description: string;
    createdAt: Date;
    completed: Boolean;
    removed: Boolean;

    constructor(description: string, createdAt = new Date(), completed = false, removed = false) {
        this.description = description;
        this.createdAt = createdAt;
        this.completed = completed;
        this.removed = removed;
    }
}
