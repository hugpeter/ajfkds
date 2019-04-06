import fetch from 'cross-fetch';
import conn from '../constants/dbConn';

export const STATUS_UPDATING = 'STATUS_UPDATING';
export const STATUS_ERROR = 'STATUS_ERROR';

export function StatusUpdating(bool){
    return { 
      type: STATUS_UPDATING,
      payload: bool 
    }
}

export function StatusError(bool){
    return { 
      type: STATUS_ERROR,
      payload: bool 
    }
}

//update delivery status of the order (vendor package)
export function UpdateVendorPackageStatus(lng, salesOrderId, deliveryStatusId) {
    return (dispatch) => {
        dispatch(StatusUpdating(true));
  
        var options = {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          },
          method: 'POST',
          body: JSON.stringify({
                LanguageCode: lng,
                SalesOrderId: salesOrderId,
                DeliveryStatusId: deliveryStatusId
            })
        }
  
        fetch(`${conn}/SalesOrder/UpdateOrderDeliveryStatus`, options)
        .then(response => {
            console.log(response.status);
            if(response.status != 200){
              dispatch(StatusError(true));
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
                dispatch(StatusUpdating(false));
              }
          }
        )
        .catch(error => {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    }
}

//update delivery status of the order line (item)
export function UpdateItemStatus(lng, salesOrderLineId, deliveryStatusId) {
    return (dispatch) => {
        dispatch(StatusUpdating(true));
  
        var options = {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          },
          method: 'POST',
          body: JSON.stringify({
                LanguageCode: lng,
                SalesOrderLineId: salesOrderLineId,
                DeliveryStatusId: deliveryStatusId
            })
        }
  
        fetch(`${conn}/SalesOrder/UpdateOrderDeliveryStatus`, options)
        .then(response => {
            console.log(response.status);
            if(response.status != 200){
              dispatch(StatusError(true));
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
                dispatch(StatusUpdating(false));
              }
          }
        )
        .catch(error => {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    }
}