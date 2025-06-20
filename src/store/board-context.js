import { createContext } from "react";

const boardContext = createContext({
  activeTool: "",
  toolAction:"",
  elements:[],
  handleToolClick: () => {},
  handleBoardMouseDown: () => {},
  handleBoardMouseMove: () => {},
  handleBoardMouseUp: ()=>{}
});

export default boardContext;