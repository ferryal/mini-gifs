import axios from 'axios';
import config from '../config';
import { GIFS } from './ActionTypes';


function loading() {
  return {
    type: GIFS.LOADING
  };
}

function fetchSuccess(data) {
  return {
    type: GIFS.FETCH_SUCCESS,
    payload: { data }
  };
}

function fetchFailed() {
  return {
    type: GIFS.FETCH_FAILED
  };
}

export function fetchGifTrending(start, count) {
  return (dispatch) => {
    dispatch(loading());
    axios.get(`${config.apiUrl}/trending?api_key=${config.apiKey}&offset=${start}&limit=${count}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        const response = res.data;
        dispatch(fetchSuccess(response));
        console.log(response)
      } else {
        dispatch(fetchFailed());
      }
    }).catch(() => {
      dispatch(fetchFailed());
    });
  };
}