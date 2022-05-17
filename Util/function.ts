import Product from '../Model/product'
export class Singleton{
    private static instance: Singleton
    private constructor (){}
    static getInstance(){
        if(!Singleton.instance){
            return Singleton.instance = new Singleton();
        }
        return Singleton.instance
    }
    pagination = (page: number, arr: any) =>{
        const itemNumber = 8
        const start = (page - 1)* itemNumber
        const end = page * itemNumber
        return arr.slice(start, end)
    }
}