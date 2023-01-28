import { MenuItemType } from "./Types";


export const HasItemsChildren = (item: MenuItemType) : boolean => {

    const {items: childrens} = item;

    if(childrens === undefined)
     return false;
     
    if(!Array.isArray(childrens))
     return false;

     return childrens.length > 0;
}

export const generateKeyId =  (min: number, max:number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}