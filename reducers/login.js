import { 
    REQUEST_SESSION, 
    SESSION_HAS_ERROR, 
    SESSION
} from '../actions/login';

export default function login(state = 
    {
        isFetching: false,
        hasError: false,
        expiration: '',
        token: '',
    }, action) {
    switch (action.type) {
      case REQUEST_SESSION:
        return Object.assign({}, state, {
            isFetching: true
        })
      case SESSION:
        return Object.assign({}, action.payload, {
            isFetching: false,
            hasError: false
        })
      case SESSION_HAS_ERROR:
        return Object.assign({}, state, {
            isFetching: false,
            hasError: true
        })
      default:
        return state;
    }
}