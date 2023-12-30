import {FuseUtils} from "../utils";



export class Category {
    id: string;
    name: string;
    description: string;
    
    /**
     * Constructor
     *
     * @param product
     */
    constructor(category:any)
    {        
        category = category || {};
        this.id = category.id || FuseUtils.generateGUID();
        this.name = category.name;
        this.description = category.description;
            
    }
}