import  {useContext}from 'react';
import classes from './index.module.css';
import cx from 'classnames';
import { RiRectangleLine } from "react-icons/ri";

import { FaSlash } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

import { TOOL_ITEMS } from '../../constants';
import boardContext from '../../store/board-context';

export const Toolbox = () => {
    const {activeTool, handleToolClick} = useContext(boardContext)
    
  return (
    <div className={classes.container}>
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
    </div>
  )
}
