import { TOOL_ITEMS, TOOL_ACTION_TYPES } from '../constants'
import { createElement } from '../util/element';
import boardContext from './board-context'
import { useReducer } from 'react'


const boardReducer=(state,action)=>{
    switch(action.type){
        case "CHANGE_TOOL":{
              return {
                  ...state,
                  activeTool: action.payload.tool,
              }
            }
        case "DRAW_MOVE":
          {
            const {clientX, clientY, colorbarState} = action.payload;
            const newElement = [...state.elements];
            const index = state.elements.length - 1;

            const element=createElement(
              index,
              newElement[index].x1,
              newElement[index].y1,
              clientX,
              clientY,
              {type: state.activeTool,
                stroke: colorbarState[state.activeTool]?.stroke,
                fill: colorbarState[state.activeTool]?.fill,
                size: colorbarState[state.activeTool]?.size,
               
              },
            )
            newElement[index]=element;
            return {
                ...state,
                elements: newElement,
            }


          }
            

          case "DRAW_DOWN":
            {
              const { clientX, clientY,colorbarState } = action.payload;
              
            const newElement =createElement(
              state.elements.length,
               clientX,
               clientY,
               clientX,
               clientY,
               {type: state.activeTool,
                stroke: colorbarState[state.activeTool]?.stroke,
                fill: colorbarState[state.activeTool]?.fill,
                size: colorbarState[state.activeTool]?.size,
               }
              )
            return{
                ...state,
                toolAction: TOOL_ACTION_TYPES.DRAWING,
                elements: [...state.elements, newElement],
            }
          }
        case "DRAW_UP":{
          return{
            ...state,
            toolAction: TOOL_ACTION_TYPES.NONE,
          }
        }
        default:
            return state;
    }
}

const initialState = {
  activeTool: TOOL_ITEMS.LINE,
  toolAction: TOOL_ACTION_TYPES.NONE,
  elements: [],
}
export const BoardPovider = ({children}) => {
    const [boardState, dispatchBoardAction]= useReducer(boardReducer, initialState);


    const handleToolClick = (tool) => {
      dispatchBoardAction({
        type:"CHANGE_TOOL",
        payload:{
            tool,
        }
      })
    };

    const handleBoardMouseDown=(event,colorbarState)=>{
        const clientX = event.clientX;
        const clientY = event.clientY;
        dispatchBoardAction({
            type:"DRAW_DOWN",
            payload:{
                clientX,
                clientY,
                colorbarState

            }

        })
    }
    
    const handleBoardMouseMove=(event, colorbarState)=>{
        const clientX = event.clientX;
        const clientY = event.clientY;
        dispatchBoardAction({
            type:"DRAW_MOVE",
            payload:{
                clientX,
                clientY,
                colorbarState
            }
        })
    }
    
    const handleBoardMouseUp=()=>{
        dispatchBoardAction({
            type:"DRAW_UP",
        })
      }
    
    const boardContextValue = {
      activeTool: boardState.activeTool,
      elements: boardState.elements,
      toolAction: boardState.toolAction,
      handleToolClick,
      handleBoardMouseDown,
      handleBoardMouseMove,
      handleBoardMouseUp,
    }

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  )
}

export default BoardPovider
