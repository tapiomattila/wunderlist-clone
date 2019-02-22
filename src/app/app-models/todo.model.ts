
export class Todo {
    public id: string;
    public name: string;
    public createdDate: Date;
    public modifiedDate: Date;
    public done: boolean;
    public deleted: boolean;
    public categoryId: string;

    constructor(id: string, name: string, createdDate: Date, modifiedDate: Date, done: boolean, deleted: boolean, categoryId) {
        this.id = id;
        this.name = name;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.done = done;
        this.deleted = deleted;
        this.categoryId = categoryId;
    }
}
