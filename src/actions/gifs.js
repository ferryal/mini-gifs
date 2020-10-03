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

function fetchSuccessSearch(data) {
  return {
    type: GIFS.FETCH_SEARCH_SUCCESS,
    payload: { data }
  };
}

function fetchFailedSearch() {
  return {
    type: GIFS.FETCH_SEARCH_FAILED
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
      } else {
        dispatch(fetchFailed());
      }
    }).catch(() => {
      dispatch(fetchFailed());
    });
  };
}

export function fetchSearch(payload, start, count) {
  return (dispatch) => {
    dispatch(loading());
    axios.get(`${config.apiUrl}/search?api_key=${config.apiKey}&q=${payload}&offset=${start}&limit=${count}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        const response = res.data;
        dispatch(fetchSuccessSearch(response));
      } else {
        dispatch(fetchFailedSearch());
      }
    }).catch(() => {
      dispatch(fetchFailedSearch());
    });
  };
}