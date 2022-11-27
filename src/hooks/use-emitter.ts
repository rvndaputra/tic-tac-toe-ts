import { useRef } from "react";

import mitt from "../helpers/emitter";
import type { AppEmitter, AppEventType } from "../model";

/**
 * @function useEmitter
 * @param {AppEmitter} emitter
 */
const useEmitter = (emitter?: AppEmitter) => {
  const _emmiter = useRef(emitter ?? mitt<AppEventType>());

  return _emmiter.current;
};

export default useEmitter;
