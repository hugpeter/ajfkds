import { 
    DISPATCH_LIST_LOADING,
    DISPATCH_LIST,
    DISPATCH_LIST_ERROR
} from '../actions/dispatch';

export default function dispatchList(state = 
    {
        isFetching: false,
        hasError: false,
        dispatchList: []
    }, action) {
    switch (action.type) {
      case DISPATCH_LIST_LOADING:
        return Object.assign({}, state, {
            isFetching: true
        })
      case DISPATCH_LIST:
        return Object.assign({}, action.payload, {
            isFetching: false,
            hasError: false
        })
      case DISPATCH_LIST_ERROR:
        return Object.assign({}, state, {
            isFetching: false,
            hasError: true
        })
      default:
        return state;
    }
}