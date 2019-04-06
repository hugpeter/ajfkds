import fetch from 'cross-fetch';
import conn from '../constants/dbConn';

export const DISPATCH_LIST_LOADING = 'DISPATCH_LIST_LOADING';
export const DISPATCH_LIST = 'DISPATCH_LIST';
export const DISPATCH_LIST_ERROR = 'DISPATCH_LIST_ERROR';

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

export function GetDispatchList(lng) {
    return (dispatch) => {
        dispatch(DispatchListLoading(true));
  
        var options = {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          },
          method: 'POST',
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
              console.log(json);
              if(json){
                dispatch(DispatchList(json));
              }
          }
        )
        .catch(error => {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    }
}