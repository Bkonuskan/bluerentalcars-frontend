import React from "react";
import { userInitialState } from "./user/userInitialState";
import { userReducer } from "./user/userReducer";

/* Merkezi state oluşturuldu */
const Store = React.createContext();
Store.displayName = "Store";

/* Merkezi state in diğer componentlerde kullanılmasını kolaylaştırmak için tanımladık */
export const useStore = () => React.useContext(Store);


export const StoreProvider = ({children}) => {
    const [userState, dispatchUser] = React.useReducer(userReducer, userInitialState);
    
    return(
        <Store.Provider value={{userState, dispatchUser}}>
            {children}
        </Store.Provider>
    )
}
