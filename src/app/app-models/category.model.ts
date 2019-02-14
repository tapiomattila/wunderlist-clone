
export class Category {
    public id: string;
    public categoryName: string;
    public createdDate: Date;
    public todoCount?: number;

    constructor(id: string, name: string, createdDate: Date, todoCount?: number) {
        this.id = id;
        this.categoryName = name;
        this.createdDate = createdDate;
        this.todoCount = todoCount;
    }
}
