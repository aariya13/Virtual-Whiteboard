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