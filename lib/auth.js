const axios = require('axios');
const fs = require('fs');

async function getToken() {
  try {
    const tokenExists = fs.existsSync('token.txt');
    if (tokenExists) {
      const token = fs.readFileSync('token.txt', 'utf8');
      const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      const expirationTime = decodedToken.exp * 1000;

      if (expirationTime - Date.now() > 5 * 60 * 1000) {
        return token;
      }
    }

    const response = await axios.post(
      'https://blog.ekhtesasi.net:8443/api/admin/token',
      {
        grant_type: 'password',
        username: 'egbal',
        password: '240406-EW-AN-hetzner#MarzbanPanel'
      },
      {
        headers: {
          Authorization: 'Basic Y2xpZW50X2lkOmNsaWVudF9zZWNyZXQ='
        }
      }
    );

    const token = response.data.access_token;
    
    fs.writeFileSync('token.txt', token, 'utf8');

    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
}

module.exports = { getToken };
