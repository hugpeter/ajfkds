import fetch from 'cross-fetch';
import conn from '../constants/dbConn';

export const UPLOADING_MEDIA = 'UPLOADING_MEDIA';
export const UPLOADING_MEDIA_ERROR = 'UPLOADING_MEDIA_ERROR';

export function UploadingMedia(bool){
    return { 
      type: UPLOADING_MEDIA,
      payload: bool 
    }
}

export function UploadingMediaError(bool){
    return { 
      type: UPLOADING_MEDIA_ERROR,
      payload: bool 
    }
}

//add a signature image, or profile 
export function UpdateVendorPackageStatus(lng, salesOrderId, signatureUrl) {
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