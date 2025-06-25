import { useContext } from 'react'
import classes from "./colorbar.module.css"
import { COLORS, FILL_TOOL_TYPES, SIZE_TOOL_TYPES, STROKE_TOOL_TYPES, TOOL_ITEMS } from '../../constants';

import cx from 'classnames'
import colorbarContext from '../../store/colorbar-context';
import boardContext from '../../store/board-context';
const Colorbar = () => {
    const {activeTool}=useContext(boardContext)
    const {colorbarState, handleStrokeColor, handleFillColor, handleSizeOption}=useContext(colorbarContext)
    const strokeColor= colorbarState[activeTool]?.stroke
    const FillColor= colorbarState[activeTool]?.fill;
    const size= colorbarState[activeTool]?.size;
  return (
    <div className={classes.container}>
        {STROKE_TOOL_TYPES.includes(activeTool) && (<div className={classes.selectOptionContainer}>
            <div className={classes.colorBarLabel}>Stroke</div>
            <div className={classes.colorContainer}>
                <div>
                    <input
                        className={classes.colorPicker}
                        type="color"
                        value={strokeColor}
                        onChange={(e)=> handleStrokeColor(activeTool,e.target.value)}
                        
                    />
                </div>
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
        </div>)}
        {FILL_TOOL_TYPES.includes(activeTool) && (<div className={classes.selectOptionContainer}>
            <div className={classes.colorBarLabel}>Fill</div>
            <div className={classes.colorContainer}>
                {FillColor===null ? (
                    <div
                        className={cx(classes.colorPicker, classes.noFillColorBox)}
                        onClick={() => handleFillColor(activeTool, COLORS.BLACK)}
                    >
                    </div>
                ):
                (<div>
                    <input
                        className={classes.colorPicker}
                        type="color"
                        value={strokeColor}
                        onChange={(e)=> handleFillColor(activeTool,e.target.value)}
                        
                    />
                </div>
                )}
                <div
                className={cx(classes.colorBox, classes.noFillColorBox, {
                    [classes.activeColorBox]: FillColor === null,
                })}
                onClick={() => handleFillColor(activeTool, null)}
                ></div>
                {Object.keys(COLORS).map((c)=>{
                    return (
                        <div 
                        key={c}
                        className={cx(classes.colorBox, {[classes.activeColorBox] : FillColor===COLORS[c]})}
                        style={{backgroundColor: COLORS[c]}}
                        onClick={()=>{handleFillColor(activeTool,COLORS[c])}}></div>
                    );
                })}

            </div>
        </div>
        )}
        {SIZE_TOOL_TYPES.includes(activeTool) && (<div className={classes.selectOptionContainer}>
            <div className={classes.colorBarLabel}>Size</div>
            <input
            type="range"
            min={activeTool===TOOL_ITEMS.TEXT ? 12 : 1}
            max={activeTool===TOOL_ITEMS.TEXT ? 62 : 10}
            step={1}
            value={size}
            onChange={(event)=> handleSizeOption(activeTool, event.target.value)}
            ></input>
        </div>)}
    </div>
  )
}
export default Colorbar;
