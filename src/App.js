
import { Toolbox } from "./components/Toolbox/index.js";
import BoardPovider from "./store/board-provider.js";
import Board from "./components/Board/index.js";
import ColorBarProvider  from "./store/colorbar-provider.js";
import Colorbar from "./components/ColorBar/colorbar.js";

function App() {
  

  return (
    <BoardPovider>
      <ColorBarProvider>
        <Board />
        <Toolbox />
        <Colorbar/>
      </ColorBarProvider>
    </BoardPovider>
  );
}

export default App;

