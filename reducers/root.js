import { combineReducers } from 'redux';
import login from './login';
import dispatch from './dispatch';

const root = combineReducers({
    login,
    dispatch
});

export default root;