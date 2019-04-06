import { combineReducers } from 'redux';
import login from './login';
import dispatch from './dispatch';
import updateStatus from './updateStatus';

const root = combineReducers({
    login,
    dispatch,
    updateStatus
});

export default root;