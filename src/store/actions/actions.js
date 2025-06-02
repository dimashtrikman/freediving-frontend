import { 
  MAIN, 
} from "../types/types";

export const cardholderList = (data) => {
  return { type: MAIN, payload: data }
};
