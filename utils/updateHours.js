const { google } = require("googleapis");
async function updateHours(rangeToUpdate, totalHours) {
    const serviceAccount = require("./service-account.json");
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  
    try {
      const client = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = "1r6HUu3lM4FByTPoe3pFA1JF2ARvT8HyP5R2MGPbUiS8";
      
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: rangeToUpdate,
        valueInputOption: "RAW",
        resource: {
          values: [[totalHours]]
        }
      });
  
      console.log(`Updated Total Hours Gave to ${totalHours}`);
    } catch (error) {
      console.error("Error updating hours:", error);
    }
  }
  

module.exports = { updateHours };
