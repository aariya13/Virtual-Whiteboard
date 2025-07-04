import  {useContext}from 'react';
import classes from './index.module.css';
import cx from 'classnames';

import { RiRectangleLine } from "react-icons/ri";
import { FaDownload, FaSlash } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import { IoText } from "react-icons/io5";
import { FaUndo, FaRedo } from "react-icons/fa";

import { TOOL_ITEMS } from '../../constants';
import boardContext from '../../store/board-context';

export const Toolbox = () => {
    const {activeTool, handleToolClick,undo,redo} = useContext(boardContext)

    const download=()=>{
        const canvas=document.getElementById("canvas");
        const data= canvas.toDataURL("image/png");
        const anchor= document.createElement("a");
        anchor.href=data;
        anchor.download= "board.png";
        anchor.click();
    }
    
  return (
    <div className={classes.container}>
        <div className={cx(classes.toolItem, { [classes.active]: activeTool === TOOL_ITEMS.BRUSH})}
        onClick={()=> handleToolClick(TOOL_ITEMS.BRUSH)}>
            <FaPaintBrush />
        </div>
        <div className={cx(classes.toolItem, { [classes.active]: activeTool === TOOL_ITEMS.RECTANGLE})}
        onClick={()=> handleToolClick(TOOL_ITEMS.RECTANGLE)}>
            <RiRectangleLine />
        </div>
        <div className={cx(classes.toolItem, { [classes.active]: activeTool === TOOL_ITEMS.LINE})}
        onClick={()=> handleToolClick(TOOL_ITEMS.LINE)}>
            <FaSlash />
        </div>
        <div className={cx(classes.toolItem, { [classes.active]: activeTool === TOOL_ITEMS.CIRCLE})}
        onClick={()=> handleToolClick(TOOL_ITEMS.CIRCLE)}>
            <FaRegCircle />
        </div>
        <div className={cx(classes.toolItem, { [classes.active]: activeTool === TOOL_ITEMS.ARROW})}
        onClick={()=> handleToolClick(TOOL_ITEMS.ARROW)}>
            <FaArrowRight />
        </div>
        <div className={cx(classes.toolItem, { [classes.active]: activeTool === TOOL_ITEMS.ERASER})}
        onClick={()=> handleToolClick(TOOL_ITEMS.ERASER)}>
            <FaEraser />
        </div>
        <div className={cx(classes.toolItem, { [classes.active]: activeTool === TOOL_ITEMS.TEXT})}
        onClick={()=> handleToolClick(TOOL_ITEMS.TEXT)}>
            <IoText />
        </div>
        <div className={classes.toolItem}
        onClick={undo}>
            <FaUndo />
        </div>
        <div className={classes.toolItem}
        onClick={redo}>
            <FaRedo />
        </div>
        <div className={classes.toolItem}
        onClick={download}>
            <FaDownload />
        </div>
    </div>
  )
}
