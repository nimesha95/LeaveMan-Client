import {GET_PENDING_LEAVE} from '../types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated : false,
};

export default (state = initialState, action = {}) => {
    switch(action.type){
        case GET_PENDING_LEAVE:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        default: return state;
    }
}