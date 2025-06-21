import React, { useContext } from 'react'
import classes from "./colorbar.module.css"
import { COLORS } from '../../constants';

import cx from 'classnames'
import colorbarContext from '../../store/colorbar-context';
import boardContext from '../../store/board-context';
const Colorbar = () => {
    const {activeTool}=useContext(boardContext)
    const {colorbarState, handleStrokeColor}=useContext(colorbarContext)
    const strokeColor= colorbarState[activeTool]?.stroke
  return (
    <div className={classes.container}>
        <div className={classes.selectOptionContainer}>
            <div className={classes.colorBarLabel}>Stroke</div>
            <div className={classes.colorContainer}>
                {Object.keys(COLORS).map((c)=>{
                    return (
                        <div 
                        key={c}
                        className={cx(classes.colorBox, {[classes.activeColorBox] : strokeColor===COLORS[c]})}
                        style={{backgroundColor: COLORS[c]}}
                        onClick={()=>{handleStrokeColor(activeTool,COLORS[c])}}></div>
                    );
                })}

            </div>
        </div>
    </div>
  )
}
export default Colorbar;
