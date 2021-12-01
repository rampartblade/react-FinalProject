import axios from 'axios';

const baseURL = 'http://localhost:5000/'

export function readAll() {
    return async (dispatch) => {
        const res = await axios.get(`${baseURL}debug`)
        dispatch({
            type: 'READ_ALL',
            payload: res.data
        })
        /* try {
            const res = await axios.get(`http://localhost:5000/debug`)
            dispatch({
                type: 'READ_ALL',
                payload: res.data
            })
        }
        catch(e){
           console.log('')
        } */
    }
}

export function readOne(key){
    return async (dispatch) => {
        const res =await axios.get(`${baseURL}keys/${key}`)
        dispatch({
            type: 'READ_ONE',
            payload: res.data
        })
    }
}

export function post(serverport) {
    return async (dispatch) => {
        //console.log(serverport)
        const res = await axios.post(`${baseURL}keys`, serverport)
        dispatch(readAll())
    }
}

export function put(key,data){
    return async (dispatch) => {
        //const res = await axios.put(`${baseURL}keys/${key}`,data)
        //console.log(`${baseURL}keys/${key}`)
        dispatch(readAll())
        /* {
            type: 'UPDATE',
            payload: res.data
        }, */ 
    }
}

export function deleted(key){
    return async (dispatch) => {
        //const res = await axios.delete(`${baseURL}keys/${key}`)
        dispatch( readAll())
        /* {
            type: 'DELETE',
            payload: res.data
        } */
    }
}