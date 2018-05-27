import axios from 'axios';

export function makeLeaveRequest(leaveInfo){
    return dispatch => {
        return axios.post('/api/leave', leaveInfo);
    }
}