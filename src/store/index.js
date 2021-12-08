import React, { useReducer } from "react";
import { reservationInitialState } from "./reservation/reservationInitialState";
import { reservationReducer } from "./reservation/reservationReducer";
import { userInitialState } from "./user/userInitialState";
import { userReducer } from "./user/userReducer";
import { vehiclesInitialState } from "./vehicles/vehiclesInitialState";
import { vehiclesReducer } from "./vehicles/vehiclesReducer";

/* Merkezi state oluşturuldu */
const Store = React.createContext();
Store.displayName = "Store";

/* Merkezi state in diğer componentlerde kullanılmasını kolaylaştırmak için tanımladık */
export const useStore = () => React.useContext(Store);

export const StoreProvider = ({ children }) => {
  const [userState, dispatchUser] = useReducer(userReducer, userInitialState);
  const [reservationState, dispatchReservation] = useReducer(
    reservationReducer,
    reservationInitialState
  );
  const [vehiclesState, dispatchVehicles] = useReducer(
    vehiclesReducer,
    vehiclesInitialState
  );

  return (
    <Store.Provider
      value={{
        userState,
        dispatchUser,
        reservationState,
        dispatchReservation,
        vehiclesState,
        dispatchVehicles,
      }}
    >
      {children}
    </Store.Provider>
  );
};
