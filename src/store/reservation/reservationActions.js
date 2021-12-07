import { types } from "../types";

export const setReservationState = (reservation) => ({
    type: types.SET_RESERVATION,
    payload: reservation
});
