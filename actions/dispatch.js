import fetch from 'cross-fetch';
import axios from 'axios';
import conn from '../constants/dbConn';

export const DISPATCH_LIST_LOADING = 'DISPATCH_LIST_LOADING';
export const DISPATCH_LIST = 'DISPATCH_LIST';
export const DISPATCH_LIST_ERROR = 'DISPATCH_LIST_ERROR';
export const UPDATE_ORDER_ID = 'UPDATE_ORDER_ID';

export function DispatchListLoading(bool){
    return { 
      type: DISPATCH_LIST_LOADING,
      payload: bool 
    }
}

export function DispatchList(data){
    return {
        type: DISPATCH_LIST,
        payload: data
    }
}

export function DispatchListError(bool){
    return {
        type: DISPATCH_LIST_ERROR,
        payload: bool
    }
}

export function newOrderId(id){
  return { 
    type: UPDATE_ORDER_ID,
    payload: id 
  }
}

export function updateOrderId(id){
  return(dispatch) => {
    dispatch(newOrderId(id));
  }
}

export function GetDispatchList(lng, token) {
    return (dispatch) => {
        dispatch(DispatchListLoading(true));

        var options = {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + token
          },
          type: 'application/json',
          method: 'post',
          body: JSON.stringify({
                LanguageCode: lng
            })
        }
  
        fetch(`${conn}/SalesOrder/ToDispatch`, options)
        .then(response => {
            console.log(response.status);
            if(response.status != 200){
              dispatch(DispatchListError(true));
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
              if(json){
                var dispatchList = json.body;
                dispatch(DispatchList(dispatchList));
              }
          }
        )
        .catch(error => {
          console.log('------------------Failed Fetch Operation for (dispatch.js)------------------');
          console.log(error.stack);
          console.log('---------------------------------END ERROR-----------------------------------');
        });
    }
}