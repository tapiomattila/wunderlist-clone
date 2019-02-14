
export class Todo {
    public id: string;
    public name: string;
    public createdDate: Date;

    constructor(id: string, name: string, createdDate: Date) {
        this.id = id;
        this.name = name;
        this.createdDate = createdDate;
    }
}
