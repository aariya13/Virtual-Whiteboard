import { useReducer } from "react"
import colorbarContext from "./colorbar-context"
import { COLORBAR_ACTIONS, COLORS, TOOL_ITEMS } from "../constants";

const colorbarReducer=(state,action)=>{
    switch(action.type){
        case "CHANGE_STROKE":{
            const tool = action.payload.tool;
            if (!state[tool]) {
                console.warn(`Invalid tool: ${tool}`);
                return state;
            }
            const newState={...state};
            newState[action.payload.tool].stroke=action.payload.stroke;
            return newState;
        }
        case "CHANGE_FILL":{
            const newState={...state};
            newState[action.payload.tool].fill=action.payload.fill;
            return newState;
        }
        case "CHANGE_SIZE":{
            const newState={...state};
            newState[action.payload.tool].size=action.payload.size;
            return newState;
        }
        default:
            throw new Error("Action not found");
    }
}

const initialState={
    [TOOL_ITEMS.BRUSH]:{
        stroke: COLORS.BLACK
    },
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

    const handleFillColor=(tool,fill)=>{
        dispatchColorbarAction({
            type: COLORBAR_ACTIONS.CHANGE_FILL,
            payload:{
                tool,
                fill
            }
        })
    }

    const handleSizeOption=(tool,size)=>{
        dispatchColorbarAction({
            type: COLORBAR_ACTIONS.CHANGE_SIZE,
            payload:{
                tool,
                size
            }
        })
    }

    const colorbarValue={
        colorbarState,
        handleStrokeColor,
        handleFillColor,
        handleSizeOption,
    }

    return (
        <colorbarContext.Provider value={colorbarValue}>
            {children}
        </colorbarContext.Provider>
    )
}

export default ColorBarProvider;