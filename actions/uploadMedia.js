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
export function vendorSignature(uri, orderID, token) {
    return (dispatch) => {
        dispatch(StatusUpdating(true));

        //create formdata object
        const formData = new FormData();
        var metaData = orderID + '_v_signature';

        formData.append(metaData, {
          uri: uri,
          type: 'image/jpeg'
        });
  
        var options = {
          headers: {
            'Accept' : 'application/json',
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + token
          },
          method: 'post',
          body: formData
        }
  
        fetch(`${conn}/SalesOrder/CreateOrderDeliveryLog`, options)
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