import { types } from "../types";
import { reservationInitialState } from "./reservationInitialState";

export const reservationReducer = (state = reservationInitialState, action) => {
    if(action.type === types.SET_RESERVATION){
        return{
            ...state,
            reservation: action.payload
        }
    }
}