import * as constants from '../constants/app';
import axios from 'axios';
import store from '../../store';

export const getAPIData = () => {
  return axios.get('/api/ROUTE_NAME')
    .then(results => {
      //Get some data from results
      let data = results.data;
      dispatch({
        type: constants.BLANK_ACTION,
        data: data,
      });
    });
};

export const postAPIData = (tasks, title) => {
  return dispatch => {
    return axios.post('/api/ROUTE_NAME', data)
      .then(results => {
        dispatch({
          type: constants.BLANK_ACTION
        });
      })
      .catch(()=>{
        dispatch({
          type: constants.BLANK_ACTION
        });
      });
      
  };
};

export const handleTitleChange = (twitterUser) => ({
  type: constants.SET_TWITTER_USER,
  twitterUser: twitterUser
});