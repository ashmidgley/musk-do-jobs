export class Job {
    id: string;
    userId: string;
    description: string;
    createdAt: Date;
    completed: Boolean;
    removed: Boolean;

    constructor(userId: string, description: string, id = '0', createdAt = new Date(), completed = false, removed = false) {
        this.id = id;
        this.userId = userId;
        this.description = description;
        this.createdAt = createdAt;
        this.completed = completed;
        this.removed = removed;
    }
}
