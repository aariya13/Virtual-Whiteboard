import { TOOL_ITEMS } from "../constants"
import rough from 'roughjs'
const gen=rough.generator();



export const createElement =(id, x1,y1,x2,y2, {type})=>{
    const newElement = {
        id,x1,y1,x2,y2,type
    }
    let option={
        seed: id+1,
    }
    switch (type){
        case TOOL_ITEMS.LINE:{
            newElement.roughElement=gen.line(x1,y1,x2,y2,option);
            return newElement;
        }
        case TOOL_ITEMS.RECTANGLE:{
            newElement.roughElement=gen.rectangle(x1,y1,(x2-x1),(y2-y1),option);
            return newElement;
        }
        default:
            throw new Error("Type is not recognised");

    }
}