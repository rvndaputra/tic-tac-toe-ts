import type { Emitter } from "../helpers/emitter";
import type { ScoreType } from "./types";

export type AppEmitter = Emitter<AppEventType>;

export type AppEventType = {
  "@player/click": number;
  "@game/end": GameEndEventType;
  "@game/restart": unknown;
};

export type GameEndEventType = {
  isEnd: boolean;
  winner: keyof ScoreType | null;
};
