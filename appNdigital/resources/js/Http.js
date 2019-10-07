import axios from 'axios';
import store from './store';
import * as actions from './store/actions';

const token = localStorage.getItem('access_token');

axios.interceptors.request.use(request => {
console.log(request)

  if(request.url.includes('/api/v1') == true){
    request.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete request.headers.common.Authorization;
    console.log(request.headers);
  }
  return request
})

axios.interceptors.response.use(
  response =>  response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(actions.authLogout());
    }
    return Promise.reject(error);
  },
);

export default axios;
// { 
//   if(response.config.url.substring(0,27) == 'https://api.themoviedb.org/' )
//   {
//     console.log('headers',response.config.headers.Authorization)
//   } 
//             }