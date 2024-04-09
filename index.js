const { google } = require("googleapis");
require('dotenv').config(); 

try {
  const auth = new google.auth.GoogleAuth({
    key: process.env.GOOGLE_API, 
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  auth
    .getClient()
    .then((client) => {
      const sheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = "1r6HUu3lM4FByTPoe3pFA1JF2ARvT8HyP5R2MGPbUiS8";
      return sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!',
      });
    })
    .then((response) => {
      const rows = response.data.values;
      if (rows && rows.length) {
        console.log("Datas:");
        rows.forEach((row) => {
          console.log(row.join("\t"));
        });
      } else {
        console.log("No data found.");
      }
    })
    .catch((err) => {
      console.error("Error reading:", err);
    });
} catch (error) {
  console.error("Error: ", error);
}
console.log("End");
