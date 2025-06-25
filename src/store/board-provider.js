import getStroke from 'perfect-freehand';
import { TOOL_ITEMS, TOOL_ACTION_TYPES, BOARD_ACTIONS } from '../constants'
import { createElement, getSvgPathFromStroke, isPointNearElement } from '../util/element';
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
                toolAction: (state.activeTool=== TOOL_ITEMS.TEXT) ? TOOL_ACTION_TYPES.WRITING:TOOL_ACTION_TYPES.DRAWING,
                elements: [...state.elements, newElement],
            }
          }
        case "DRAW_MOVE":
          {
            const {clientX, clientY, colorbarState} = action.payload;
            const newElement = [...state.elements];
            const index = state.elements.length - 1;
            const {type}=newElement[index];
            switch(type){
              case TOOL_ITEMS.LINE:
              case TOOL_ITEMS.RECTANGLE:
              case TOOL_ITEMS.CIRCLE:
              case TOOL_ITEMS.ARROW:{
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
              case TOOL_ITEMS.BRUSH:{
                newElement[index].points=[
                  ...newElement[index].points,{x:clientX, y:clientY}
                ]
                newElement[index].path= new Path2D(getSvgPathFromStroke(getStroke(newElement[index].points)));
                return {
                  ...state,
                  elements: newElement
                };

              }
              default:
                break;
              
            }
            break;
          }
        case BOARD_ACTIONS.CHANGE_ACTION_TYPE:{
          return{
            ...state,
            toolAction: action.payload.actionType,
          }
        }
        case BOARD_ACTIONS.ERASE:{
          const {clientX,clientY}= action.payload;
          let newElement=[...state.elements];
          newElement=newElement.filter((element)=>{
            return !isPointNearElement(clientX,clientY,element);
          })
          
          const newHistory = state.history.slice(0, state.index+1);
          newHistory.push(newElement);
          return {
            ...state,
            elements:newElement,
            history: newHistory,
            index: state.index + 1,
          }
        }
        case BOARD_ACTIONS.CHANGE_TEXT:{
          
          const { text, stroke, size } = action.payload;
          const newElement=[...state.elements];
          const index=state.elements.length -1;
          newElement[index].text= text;
          if (stroke) newElement[index].stroke = stroke;
          if (size) newElement[index].size = size;
          const newHistory = state.history.slice(0, state.index+1);
          newHistory.push(newElement);
          return{
            ...state,
            toolAction: TOOL_ACTION_TYPES.NONE,
            elements: newElement,
            history: newHistory,
            index: state.index + 1,
          }
        }
        case BOARD_ACTIONS.DRAW_UP:{
          const elementCopy = [...state.elements];
          const newHistory = state.history.slice(0, state.index+1);
          newHistory.push(elementCopy);
          return{
            ...state,
            history: newHistory,
            index: state.index+1,
          }
        }
        case BOARD_ACTIONS.UNDO:{
          if(state.index <= 0)return state;
          return{
            ...state,
            elements: state.history[state.index - 1],
            index: state.index-1,
          }
        }
        case BOARD_ACTIONS.REDO:{
          if(state.index >= state.history.length -1 )return state;
          return{
            ...state,
            elements: state.history[state.index+1],
            index: state.index+1,
          }
        }
        default:
            return state;
    }
}

const initialState = {
  activeTool: TOOL_ITEMS.BRUSH,
  toolAction: TOOL_ACTION_TYPES.NONE,
  elements: [],
  history: [[]],
  index: 0
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
        if (boardState.toolAction === TOOL_ACTION_TYPES.WRITING) {
          // Don't allow new element while typing in textarea
          return;
        }
        //console.log("YES");
        if(boardState.activeTool===TOOL_ITEMS.ERASER){
          dispatchBoardAction({
            type:BOARD_ACTIONS.CHANGE_ACTION_TYPE,
            payload: {
              actionType: TOOL_ACTION_TYPES.ERASING,
            },
          })
          return;
        }
        
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
      if(boardState.activeTool=== TOOL_ITEMS.TEXT)return;
        const clientX = event.clientX;
        const clientY = event.clientY;
      if (boardState.toolAction === TOOL_ACTION_TYPES.DRAWING) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.DRAW_MOVE,
        payload: {
          clientX,
          clientY,
          colorbarState
        },
      });
    } else if (boardState.toolAction === TOOL_ACTION_TYPES.ERASING) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.ERASE,
        payload: {
          clientX,
          clientY,
        },
      });
    }
        
    }
    
    const handleBoardMouseUp=()=>{
      if (boardState.toolAction === TOOL_ACTION_TYPES.WRITING) return;

      if (boardState.toolAction === TOOL_ACTION_TYPES.DRAWING) {
        dispatchBoardAction({
          type: BOARD_ACTIONS.DRAW_UP

        })
      }
      dispatchBoardAction({
        type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
        payload:{
          actionType:TOOL_ACTION_TYPES.NONE
        }
          
        
      })
    }
    
    const handleTextArea=(text,colorbarState)=>{
      const color = colorbarState[TOOL_ITEMS.TEXT]?.stroke;
      const size = colorbarState[TOOL_ITEMS.TEXT]?.size;
      dispatchBoardAction({
        type: BOARD_ACTIONS.CHANGE_TEXT,
        payload:{
          text,
          stroke: color,
          size,

        }
      })
    }

    const handleUndo=()=>{
      dispatchBoardAction({
        type: BOARD_ACTIONS.UNDO
      })
    }
    const handleRedo=()=>{
      dispatchBoardAction({
        type: BOARD_ACTIONS.REDO
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
      handleTextArea,
      undo: handleUndo,
      redo: handleRedo,
    }

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  )
}

export default BoardPovider
