
export class Todo {
    public id: string;
    public name: string;
    public createdDate: Date;
    public modifiedDate: Date;
    public deleted: boolean;
    public categoryId: string;
    public starred: boolean;
    public completed: boolean;

    constructor(id: string, name: string, createdDate: Date,
        modifiedDate: Date, deleted: boolean, categoryId, starred, completed) {
        this.id = id;
        this.name = name;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.deleted = deleted;
        this.categoryId = categoryId;
        this.starred = starred;
        this.completed = completed;
    }
}
