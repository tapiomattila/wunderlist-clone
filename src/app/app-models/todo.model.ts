
export class Todo {
    public id: string;
    public name: string;
    public createdDate: Date;
    public modifiedDate: Date;
    public done: boolean;
    public deleted: boolean;

    constructor(id: string, name: string, createdDate: Date, modifiedDate: Date, done: boolean, deleted: boolean) {
        this.id = id;
        this.name = name;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.done = done;
        this.deleted = deleted;
    }
}
