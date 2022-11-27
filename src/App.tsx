import Board from "./components/Board";
import AppProvider from "./context/app";
import useEmitter from "./hooks/use-emitter";

import { containerStyle } from "./styles";

const App = () => {
  const emitter = useEmitter();

  return (
    <AppProvider emitter={emitter}>
      <div className={containerStyle}>
        <Board />
      </div>
    </AppProvider>
  );
};

export default App;
