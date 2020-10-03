import { GIFS } from '../actions/ActionTypes';

const initialState = {
  loading: false,
  gifs: {}
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
    case GIFS.FETCH_IMAGE_SUCCESS:
      return {
        ...state,
        pokemon: [...state.pokemon, action.payload.data]
      };
    default:
      return state;
  }
};
