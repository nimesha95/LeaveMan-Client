import axios from 'axios';

export function getData(){
    return dispatch => {
        return axios.post('/api/common/return_stuff').then(res =>{
            console.log("this is the resul-->"+JSON.stringify(res));    
        })
    }
}