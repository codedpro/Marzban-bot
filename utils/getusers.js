const { getToken } = require('../lib/auth');
const { setHeaders } = require('./setHeaders');

async function getUsers() {
  try {
    const token = await getToken();

    const headers = await setHeaders();

    const response = await axios.get('https://blog.ekhtesasi.net:8443/api/users', headers);
    
    console.log('User data:', response.data);
  } catch (error) {
    console.error('Error getting users:', error);
  }
}

module.exports = { getUsers };
