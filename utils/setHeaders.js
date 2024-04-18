const fs = require('fs');

async function setHeaders() {
  try {
    const token = fs.readFileSync('token.txt', 'utf8');

    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  } catch (error) {
    console.error('Error setting headers:', error);
    throw error;
  }
}

module.exports = { setHeaders };
