import { types } from "../types";
import { userInitialState } from "./userInitialState";

export const userReducer = (state = userInitialState, action) => {
    if(action.type === types.LOGIN_SUCCESS){
        return{
            ...state,
            user: action.payload,
            isUserLogin: true 
        }
    }
    else if(action.type === types.LOGIN_FAILED){
        return {
            ...state,
            user: null,
            isUserLogin: false
        }
    }
    else if(action.type === types.LOGOUT){
        return{
            ...state,
            user:null,
            isUserLogin: false
        }
    }
}