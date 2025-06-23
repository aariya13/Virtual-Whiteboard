import { useLayoutEffect, useRef } from 'react';
import rough from 'roughjs';
import { useContext } from 'react';
import boardContext from '../../store/board-context';
import {  TOOL_ITEMS } from '../../constants';
import colorbarContext from '../../store/colorbar-context';

const Board = ()=>{
    const canvasRef = useRef(null);
    const {
      elements, 
      handleBoardMouseDown, 
      handleBoardMouseMove,
      handleBoardMouseUp
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
          default:
            break;
        }
      })
      return () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
  }, [elements]);

  const handleMouseDown= (event)=>{
    handleBoardMouseDown(event,colorbarState);
  }


  const handleMove = (event) => {
      handleBoardMouseMove(event,colorbarState);
  };
  
  const handleMoveUp= () =>{
    handleBoardMouseUp();
  }
  return (
    <div>
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