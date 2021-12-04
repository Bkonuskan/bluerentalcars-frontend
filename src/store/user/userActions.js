/* User ile alakalı state i değiştirecek metodlar tanımlanır */

import { types } from "../types";

/* User ın başarılı şekilde giriş yapması durumunda çağrılır */
export const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

/* User ın başarısız login girişimlerinde çağrılır */
export const loginFailed = () => ({
  type: types.LOGIN_FAILED,
});

/* User ın logout işleminde çağrılır */
export const logout = () => ({
  type: types.LOGOUT,
});
