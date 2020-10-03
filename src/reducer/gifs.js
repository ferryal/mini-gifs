import { GIFS } from '../actions/ActionTypes';

const initialState = {
  loading: false,
  gifs: {},
  results: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GIFS.LOADING:
      return {
        ...state,
        loading: true
      };
    case GIFS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
				gifs: action.payload.data
      };
    case GIFS.FETCH_FAILED:
      return {
        ...state,
        loading: false
      };
    case GIFS.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload.data
      }
    case GIFS.FETCH_SEARCH_FAILED:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};
