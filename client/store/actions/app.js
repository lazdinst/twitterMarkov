import * as constants from '../constants/app';
import axios from 'axios';
import store from '../../store';

export const setTwitterUser = twitterUser => {
  return ({
    type: constants.SET_TWITTER_USER,
    twitterUser: twitterUser
  });
}

export const setTweetsByUser = tweets => {
  return ({
    type: constants.SET_TWEETS_FROM_USER,
    tweets: tweets
  });
}

export const setTweetText = tweetText => {
  return ({
    type: constants.SET_TWEET_TEXT,
    tweetText: tweetText
  });
}

export const setnGramTable = nGrams => {
  return ({
    type: constants.SET_NGRAM_TABLE,
    nGrams: nGrams
  });
}

export const setnGramOrder = nGramOrder => {
  return ({
    type: constants.SET_NGRAM_ORDER,
    nGramOrder: nGramOrder
  });
}

export const addNewMarkovTweet = markov => {
  return ({
    type: constants.ADD_NEW_MARKOV_TWEET,
    markov: markov
  });
}

export const resetMarkovs = markov => {
  return ({
    type: constants.RESET_MARKOVS,
    markov: []
  });
}