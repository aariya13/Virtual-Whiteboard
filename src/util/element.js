import { ARROW_LENGTH, TOOL_ITEMS } from "../constants"
import rough from 'roughjs'
import { getArrowHeadCoordinates } from "./math";
import getStroke from "perfect-freehand";
const gen=rough.generator();



export const createElement =(id, x1,y1,x2,y2, {type, stroke,fill,size})=>{
    const newElement = {
        id,x1,y1,x2,y2,type,stroke,fill,size
    }
    let option={
        seed: id+1,
        fillStyle: "solid",
    }
    if (stroke) {
        option.stroke = stroke;
    }
    if (fill) {
        option.fill = fill;
    }
    if (size) {
        option.strokeWidth = size;
    }
    switch (type){
        case TOOL_ITEMS.BRUSH:{
            const brushElement={
                id,
                points: [{x:x1,y:y2}],
                path: new Path2D (getSvgPathFromStroke(getStroke([{x:x1,y:y1}]))),
                type,
                stroke,

            }
            return brushElement;
        }
        case TOOL_ITEMS.LINE:{
            newElement.roughElement=gen.line(x1,y1,x2,y2,option);
            return newElement;
        }
        case TOOL_ITEMS.RECTANGLE:{
            newElement.roughElement=gen.rectangle(x1,y1,(x2-x1),(y2-y1),option);
            return newElement;
        }
        case TOOL_ITEMS.CIRCLE:{
            const cx=(x1+x2)/2;
            const cy=(y1+y2)/2;
            newElement.roughElement=gen.ellipse(cx,cy,(x2-x1),(y2-y1), option);
            return newElement;
        }
        case TOOL_ITEMS.ARROW:{
            const {x3,y3,x4,y4}= getArrowHeadCoordinates(x1,y1,x2,y2, ARROW_LENGTH);
            const path=[
                [x1,y1],
                [x2,y2],
                [x3,y3],
                [x2,y2],
                [x4,y4],
                [x2,y2],
            ]
            newElement.roughElement=gen.linearPath(path,option);
            return newElement;
        }
        default:
            throw new Error("Type is not recognised");

    }
}

export const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};