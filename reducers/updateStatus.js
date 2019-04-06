import { 
    STATUS_UPDATING,
    STATUS_ERROR
} from '../actions/updateStatus';

export default function dispatchList(state = 
    {
        isUpdatingStatus: false,
        updatingStatusError: false
    }, action) {
    switch (action.type) {
      case STATUS_UPDATING:
        return Object.assign({}, state, {
            isUpdatingStatus: action.payload
        })
      case STATUS_ERROR:
        return Object.assign({}, state, {
            updatingStatusError: action.payload
        })
      default:
        return state;
    }
}