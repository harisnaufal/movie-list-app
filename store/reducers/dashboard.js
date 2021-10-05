export const DashboardActions = {
  GET_MOVIE_LIST_REQUEST: 'GET_MOVIE_LIST_REQUEST',
  GET_MOVIE_LIST_SUCCESS: 'GET_MOVIE_LIST_SUCCESS',
  GET_MOVIE_LIST_FAIL: 'GET_MOVIE_LIST_FAIL',
  GET_MOVIE_DETAILS_REQUEST: 'GET_MOVIE_DETAILS_REQUEST',
  GET_MOVIE_DETAILS_SUCCESS: 'GET_MOVIE_DETAILS_SUCCESS',
  GET_MOVIE_DETAILS_FAIL: 'GET_MOVIE_DETAILS_FAIL',
  SET_LIST_EMPTY: 'SET_LIST_EMPTY',
};

const initialState = {
  loading: true,
  lists: [],
  details: {},
};

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case DashboardActions.GET_MOVIE_LIST_REQUEST:
      return { ...state, loading: true };
    case DashboardActions.GET_MOVIE_LIST_SUCCESS:
      let res = null;
      if (action?.payload?.data?.Response === 'True') {
        res = [...state.lists, ...action?.payload?.data?.Search];
      } else {
        res = action?.payload?.data;
      }

      return {
        ...state,
        loading: false,
        lists: res,
      };
    case DashboardActions.GET_MOVIE_LIST_FAIL:
      return { ...state, loading: false, lists: [] };

    case DashboardActions.GET_MOVIE_DETAILS_REQUEST:
      return { ...state, loading: true, details: {} };
    case DashboardActions.GET_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.payload.data,
      };
    case DashboardActions.GET_MOVIE_DETAILS_FAIL:
      return { ...state, loading: false, details: {} };

    case DashboardActions.SET_LIST_EMPTY:
      return { ...state, loading: false, lists: [] };

    default:
      return state;
  }
};
