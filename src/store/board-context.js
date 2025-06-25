import { createContext } from "react";

const boardContext = createContext({
  activeTool: "",
  toolAction:"",
  elements:[],
  history: [[]],
  index: 0,
  handleToolClick: () => {},
  handleBoardMouseDown: () => {},
  handleBoardMouseMove: () => {},
  handleBoardMouseUp: ()=>{},
  handleTextArea: ()=>{},
});

export default boardContext;