import axios from 'axios';

export function makeLeaveRequest(leaveInfo){
    return dispatch => {
        return axios.post('/api/common/make_leave', leaveInfo).then(res => {
            console.log(res);
        })
        };
    }
