import { ELEMENT_ERASE_THRESHOLD } from "../constants";

export const getArrowHeadCoordinates=(x1,y1,x2,y2,len)=>{
    const thetha = Math.atan2((y2-y1),(x2-x1));
    const x3= x2 - len* Math.cos(thetha - Math.PI/6);
    const y3= y2 - len* Math.sin(thetha - Math.PI/6);

    const x4= x2 - len* Math.cos(thetha + Math.PI/6);
    const y4= y2 - len* Math.sin(thetha + Math.PI/6);

    return{
        x3,
        y3,
        x4,
        y4
    }
}

export const isPointNearLine=(x1,y1,x2,y2,x3,y3)=>{
    const dis1= distanceBetweenPoints(x1,y1,x2,y2);
    const dis2= distanceBetweenPoints(x2,y2,x3,y3);
    const dis3= distanceBetweenPoints(x1,y1,x3,y3);

    return Math.abs(dis1-dis2-dis3) < ELEMENT_ERASE_THRESHOLD;
}

export const distanceBetweenPoints=(x1,y1,x2,y2)=>{
    const dx=x1-x2;
    const dy=y1-y2;
    return Math.sqrt(dx*dx - dy*dy);
}