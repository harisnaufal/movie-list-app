import { Actions } from '../../constants';
import { DashboardActions } from '../reducers/dashboard.js';

export const getMovieList = (dispatch, params) => {
  return new Promise((resolve, reject) => {
    const onSuccess = async (payload) => {
      dispatch({
        type: DashboardActions.GET_MOVIE_LIST_SUCCESS,
        payload,
      });
      resolve(payload);
    };

    const onFail = (err) => {
      dispatch({
        type: DashboardActions.GET_MOVIE_LIST_FAIL,
        payload: err,
      });
      reject(err);
    };

    dispatch({
      type: DashboardActions.GET_MOVIE_LIST_REQUEST,
    });

    dispatch({
      type: Actions.API_REQUEST,
      method: 'GET',
      url: `http://www.omdbapi.com`,
      params,
      onSuccess,
      onFail,
    });
  });
};

export const getMovieDetails = (dispatch, params) => {
  return new Promise((resolve, reject) => {
    const onSuccess = async (payload) => {
      dispatch({
        type: DashboardActions.GET_MOVIE_DETAILS_SUCCESS,
        payload,
      });
      resolve(payload);
    };

    const onFail = (err) => {
      dispatch({
        type: DashboardActions.GET_MOVIE_DETAILS_FAIL,
        payload: err,
      });
      reject(err);
    };

    dispatch({
      type: DashboardActions.GET_MOVIE_DETAILS_REQUEST,
    });

    dispatch({
      type: Actions.API_REQUEST,
      method: 'GET',
      url: `http://www.omdbapi.com`,
      params,
      onSuccess,
      onFail,
    });
  });
};

export const resetList = (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: DashboardActions.SET_LIST_EMPTY,
    });
  });
};
