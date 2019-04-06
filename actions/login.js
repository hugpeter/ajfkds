import fetch from 'cross-fetch';
import conn from '../constants/dbConn';

export const REQUEST_SESSION = 'REQUEST_SESSION';
export const SESSION = 'SESSION';
export const SESSION_HAS_ERROR = 'SESSION_HAS_ERROR';
export const UPDATE_ORDER_ID = 'UPDATE_ORDER_ID';

export function newOrderId(id){
  return { 
    type: UPDATE_ORDER_ID,
    payload: id 
  }
}

export function sessionHasError(bool) {
  return {
      type: SESSION_HAS_ERROR,
      payload: bool
  };
}

export function sessionIsLoading(bool) {
  return {
      type: REQUEST_SESSION,
      payload: bool
  };
}

export function sessionFetchDataSuccess(session) {
  return {
      type: SESSION,
      payload: session
  };
}

export function updateOrderId(id){
  return(dispatch) => {
    dispatch(newOrderId(id));
  }
}

export function login(username, password) {
  return (dispatch) => {
      dispatch(sessionIsLoading(true));

      var options = {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        method: 'POST',
        body: JSON.stringify({
              Username: username,
              Password: password
          })
      }

      fetch(`${conn}/Account/Login`, options)
      .then(response => {
          console.log(response.status);
          if(response.status != 200){
            dispatch(sessionHasError(true));
          } else {
            return response.json();
          }
      }
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
      )
      .then(json =>
        //update login state with successful login data
        {
            console.log(json);
            if(json){
              dispatch(sessionFetchDataSuccess(json));
            }
        }
      );
  }
}

