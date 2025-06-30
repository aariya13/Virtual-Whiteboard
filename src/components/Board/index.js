import { useEffect, useLayoutEffect, useRef } from 'react';
import rough from 'roughjs';
import { useContext } from 'react';
import boardContext from '../../store/board-context';
import {  TOOL_ACTION_TYPES, TOOL_ITEMS } from '../../constants';
import colorbarContext from '../../store/colorbar-context';
import classes from './index.module.css'

const Board = ()=>{
    const canvasRef = useRef(null);
    const textRef=useRef(null);
    const {
      elements, 
      handleBoardMouseDown, 
      handleBoardMouseMove,
      handleBoardMouseUp,
      toolAction,
      handleTextArea,
      undo,
      redo
    } = useContext(boardContext);

    const {colorbarState}=useContext(colorbarContext);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useLayoutEffect(() =>{
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.save();
      const rc = rough.canvas(canvas);
      elements.forEach((el)=>{
        switch(el.type){
          case TOOL_ITEMS.LINE:
          case TOOL_ITEMS.RECTANGLE:
          case TOOL_ITEMS.ARROW:
          case TOOL_ITEMS.CIRCLE:{
            rc.draw(el.roughElement);
            break;
          }
          case TOOL_ITEMS.BRUSH:{
            ctx.fillStyle=el.stroke;
            ctx.fill(el.path);
            
            ctx.restore();
            break;
          }
          case TOOL_ITEMS.TEXT:{
            ctx.textBaseline = "top";
            ctx.font = `${el.size}px Cookie`;
            ctx.fillStyle = el.stroke;
            ctx.fillText(el.text, el.x1, el.y1);
            ctx.restore();
            break;
          }
          default:
            break;
        }
      })
      return () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
  }, [elements]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey && event.key === "z") {
        undo();
      } else if (event.ctrlKey && event.key === "y") {
        redo();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  const handleMouseDown= (event)=>{
    handleBoardMouseDown(event,colorbarState);
  }

  useEffect(()=>{
    if(toolAction===TOOL_ACTION_TYPES.WRITING){
      setTimeout(() => {
        textRef.current.focus();
      }, 0);
    }
  }, [toolAction])


  const handleMove = (event) => {
      handleBoardMouseMove(event,colorbarState);
  };
  
  const handleMoveUp= () =>{
    handleBoardMouseUp();
  }
  return (
    <div>
      {
        toolAction=== TOOL_ACTION_TYPES.WRITING && (
          <textarea
            ref={textRef}
            className={classes.textElementBox}
            type="text"
            style={{
              top: elements[elements.length-1].y1,
              left: elements[elements.length-1].x1,
              fontSize: `${elements[elements.length-1]?.size}px`,
              color: colorbarState[TOOL_ITEMS.TEXT]?.stroke
            }}
            onBlur={(event)=>{handleTextArea(event.target.value,colorbarState)}}
          />
        )
      }
      <canvas ref={canvasRef}  
      id="canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMove}
      onMouseUp={handleMoveUp}
      />
    </div>
  );

}

export default Board;