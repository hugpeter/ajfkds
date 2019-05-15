import { 
    DISPATCH_LIST_LOADING,
    DISPATCH_LIST,
    DISPATCH_LIST_ERROR,
    UPDATE_ORDER_ID,
    LOGOUT
} from '../actions/dispatch';

export default function dispatchList(state = 
    {
        isFetching: false,
        hasError: false,
        logout: false,
        dispatchList: [],
        orderID: ''
    }, action) {
    switch (action.type) {
      case LOGOUT:
        return Object.assign({}, state, {
            logout: true
        })
      case DISPATCH_LIST_LOADING:
        return Object.assign({}, state, {
            isFetching: true
        })
      case DISPATCH_LIST:
        return Object.assign({}, state, {
            isFetching: false,
            hasError: false,
            dispatchList: action.payload,
            orderID: '',
        })
      case DISPATCH_LIST_ERROR:
        return Object.assign({}, state, {
            isFetching: false,
            hasError: true
        })
      case UPDATE_ORDER_ID:
        return Object.assign({}, state, {
          orderID: action.payload
        })
      default:
        return state;
    }
}