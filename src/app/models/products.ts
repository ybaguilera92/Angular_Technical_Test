import {FuseUtils} from "../utils";


export class Product {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(product:any)
    {
        product = product || {};
        this.id = product.id || FuseUtils.generateGUID();
        this.title = product.title;
        this.description = product.description;
        this.price = 0 || product.price;
        this.category = product.category;      
    }
}