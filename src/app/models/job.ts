export class Job {
    id: number;
    userId: number;
    description: string;
    createdAt: Date;
    completed: Boolean;
    removed: Boolean;

    constructor(userId: number, description: string, id = 0, createdAt = new Date(), completed = false, removed = false) {
        this.id = id;
        this.userId = userId;
        this.description = description;
        this.createdAt = createdAt;
        this.completed = completed;
        this.removed = removed;
    }
}
