import {GET_PENDING_LEAVE} from '../types';

const initialState = {
    toApprove: {},
    isLoading: true
};

export default (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case GET_PENDING_LEAVE:
            return {
                ...state,
                toApprove: action.toApprove.data,
            };
        default: return state;
    }
}