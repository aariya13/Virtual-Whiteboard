import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';
import { useContext } from 'react';
import boardContext from '../../store/board-context';
import { TOOL_ACTION_TYPES } from '../../constants';

const Board = ()=>{
    const canvasRef = useRef(null);
    const {
      elements, 
      handleBoardMouseDown, 
      handleBoardMouseMove, 
      toolAction, 
      handleBoardMouseUp
    } = useContext(boardContext);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() =>{
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.save();
      const rc = rough.canvas(canvas);
      elements.forEach((el)=>{
        rc.draw(el.roughElement);
      })
      return () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
  }, [elements]);

  const handleMouseDown= (event)=>{
    handleBoardMouseDown(event);
  }


  const handleMove = (event) => {
    if (toolAction === TOOL_ACTION_TYPES.DRAWING) {
      handleBoardMouseMove(event);
    }
  };
  
  const handleMoveUp= () =>{
    handleBoardMouseUp();
  }
  return (
    <div>
      <canvas ref={canvasRef}  
      onMouseDown={handleMouseDown}
      onMouseMove={handleMove}
      onMouseUp={handleMoveUp}
      />
    </div>
  );

}

export default Board;