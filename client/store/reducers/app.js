import * as constants from '../constants/app';

/** ============================================================
 * Define Initial State
 * ========================================================== */
const initialState = {};

/** ============================================================
 * Define Reducer
 * ========================================================== */
export default (state = initialState, action) => {
  switch (action.type) {
  case constants.BLANK_ACTION:
    return {
      ...state,
      data: action.data,
    };
  case constants.SET_TWITTER_USER:
    return {
      ...state,
      twitterUser: action.twitterUser,
    };
  default:
    return state;
  }
};