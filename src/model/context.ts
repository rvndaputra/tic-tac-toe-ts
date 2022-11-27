import type { ReactNode } from "react";
import type { AppEmitter } from "./event";

export interface AppProviderProps {
  children: ReactNode;
  emitter: AppEmitter;
}

export type AppContextType =
  | {
      emitter: AppEmitter;
    }
  | undefined;
