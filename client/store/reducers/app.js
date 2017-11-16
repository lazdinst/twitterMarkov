import * as constants from '../constants/app';

/** ============================================================
 * Define Initial State
 * ========================================================== */
const initialState = {
  tweets: [],
  markovs: [],
  nGrams: {},
  twitterUser: null,
  nGramOrder: 5,
  tweetText: ''
};

/** ============================================================
 * Define Reducer
 * ========================================================== */
export default (state = initialState, action) => {
  switch (action.type) {
  case constants.SET_TWITTER_USER:
    return {
      ...state,
      twitterUser: action.twitterUser,
    };
  case constants.SET_TWEETS_FROM_USER:
    return {
      ...state,
      tweets: action.tweets,
    };
  case constants.SET_NGRAM_ORDER:
    return {
      ...state,
      nGramOrder: action.nGramOrder,
    };
  case constants.SET_NGRAM_TABLE:
    return {
      ...state,
      nGrams: action.nGrams,
    };
  case constants.SET_TWEET_TEXT:
    return {
      ...state,
      tweetText: action.tweetText,
    };
  case constants.ADD_NEW_MARKOV_TWEET:
    return {
      ...state,
      markovs: [...state.markovs, action.markov]
    };
  case constants.RESET_MARKOVS:
    return {
      ...state,
      markovs: []
    };
  default:
    return state;
  }
};