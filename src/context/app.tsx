import type { FC } from "react";
import { createContext, useContext, useMemo } from "react";
import useEmitter from "../hooks/use-emitter";
import type { AppContextType, AppProviderProps } from "../model";

const AppContext = createContext<AppContextType>(undefined);

const AppProvider: FC<AppProviderProps> = (props) => {
  const { children, emitter } = props;

  const mitt = useEmitter(emitter);

  const value = useMemo(() => {
    return { emitter: mitt };
  }, [mitt]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  return context;
};

export default AppProvider;
export { AppProvider, useAppContext };
