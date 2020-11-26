import axios from 'axios'
const url = "http://localhost:1999"
export const getUser = (reg) => {
    return axios.post(url + '/register',{...reg})
}
export const getLogin = (log) => {
    return axios.post(url + '/login',{...log})
}
// export const getData = (token) => {
//     return axios.post(url + '/getuserData',{...token})
// }
