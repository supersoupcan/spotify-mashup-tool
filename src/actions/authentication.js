import axios from 'axios';

export function checkAuthentication(){
  return (dispatch) => {
    axios.get('/auth')
    .catch(err => {
      if (err) throw err;
    })
    .then(res => {
      if(res.data.authenticated){
        dispatch({
          type : "AUTHENTICATE",
          payload : {
            profile : res.data.profile
          }
        });
        const now = new Date().getTime();
        const expires = new Date(res.data.expiration).getTime();
        const timeTillExpiration = expires - now;
        console.log('oauth token expires in: ' + timeTillExpiration/1000 + ' seconds');
        setTimeout(() => {
          dispatch({
            type : "UNAUTHENTICATE"
          });
        }, timeTillExpiration);
      }
  })};
}