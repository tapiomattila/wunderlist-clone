
export class Category {
    public id: string;
    public categoryName: string;
    public createdDate: Date;

    constructor(id: string, name: string, createdDate: Date) {
        this.id = id;
        this.categoryName = name;
        this.createdDate = createdDate;
    }
}
