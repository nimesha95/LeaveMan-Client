import axios from 'axios';
import {GET_PENDING_LEAVE} from '../types';

export function loadPendingLeave(){
    return dispatch => {
        return axios.get('/api/dept_head/toApprove').then(res => {
            console.log(res.data)
            dispatch(setPending(res.data,false));
        })
        };
}

export function setPending(data,isLoading){
    return{
        type:GET_PENDING_LEAVE,
        isLoading: isLoading,
        toApprove:data
    }
}