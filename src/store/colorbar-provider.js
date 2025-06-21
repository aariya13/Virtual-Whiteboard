import { useReducer } from "react"
import colorbarContext from "./colorbar-context"
import { COLORBAR_ACTIONS, COLORS, TOOL_ITEMS } from "../constants";

const colorbarReducer=(state,action)=>{
    switch(action.type){
        case "CHANGE_STROKE":{
            const newState={...state};
            newState[action.payload.tool].stroke=action.payload.stroke;
            return newState;
        }
        default:
            throw new Error("Action not found");
    }
}

const initialState={
    [TOOL_ITEMS.LINE]:{
        stroke: COLORS.BLACK,
        size:1
    },
    [TOOL_ITEMS.RECTANGLE]:{
        stroke: COLORS.BLACK,
        size:1,
        fill: null

    },
    [TOOL_ITEMS.CIRCLE]:{
        stroke: COLORS.BLACK,
        size:1,
        fill:null
    },
    [TOOL_ITEMS.ARROW]:{
        stroke: COLORS.BLACK,
        size:1
    }
}

const ColorBarProvider=({children})=>{
    const [colorbarState, dispatchColorbarAction]= useReducer(colorbarReducer,initialState);
    const handleStrokeColor=(tool,stroke)=>{
        dispatchColorbarAction({
            type: COLORBAR_ACTIONS.CHANGE_STROKE,
            payload: {
                tool,
                stroke
            }
        })
    }

    const colorbarValue={
        colorbarState,
        handleStrokeColor
    }

    return (
        <colorbarContext.Provider value={colorbarValue}>
            {children}
        </colorbarContext.Provider>
    )
}

export default ColorBarProvider;