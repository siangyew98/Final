export class Product {

    //product(name, desc, quantity, image, day, month, year)
    name : string;
    price : number;
    description : string;
    quantity : number;
    image : string;
    imageFile: File;
    date : Number;
    id : string;

    constructor(name : string, price :  number, description : string, quantity : number, image : string,  date : Number, id ?: string)
    {
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
        this.image = image;
        this.date = date;
        this.id = id;
    }
}