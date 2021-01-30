import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://buyemall-default-rtdb.firebaseio.com/'
})

export default instance