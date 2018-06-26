import axios from 'axios';
import {GET_PENDING_LEAVE} from '../types';

export function loadPendingLeave(){
    return dispatch => {
        return axios.get('/api/dept_head/toApprove').then(res => {
            dispatch(setPending(response.data));
        })
        };
}

export function setPending(data){
    return{
        type:GET_PENDING_LEAVE,
        pending_leave:data
    }
}