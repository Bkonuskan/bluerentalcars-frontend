import { types } from "../types";
import { vehiclesInitialState } from "./vehiclesInitialState";

export const vehiclesReducer = (state = vehiclesInitialState, action) => {
    if(action.type === types.SET_VEHICLES){
        return {
            ...state,
            vehicles: action.payload
        }
    }
}