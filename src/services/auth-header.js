export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      return {'X-Requested-With': 'XMLHttpRequest'},{'Access-Control-Allow-Credentials': true},{'Access-Control-Allow-Origin': '*'},{'Content-Type': 'application/json'};
    } else {
      return {};
    }
  }