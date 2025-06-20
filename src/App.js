
import { Toolbox } from "./components/Toolbox/index.js";
import BoardPovider from "./store/board-provider.js";
import Board from "./components/Board/index.js";

function App() {
  

  return (
    <BoardPovider>
      <Board />
      <Toolbox />
      
    </BoardPovider>
  );
}

export default App;

