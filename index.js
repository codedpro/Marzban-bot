const { google } = require("googleapis");
const { updateHours } = require("./utils/updateHours");
const { getUsers } = require("./utils/getusers");

try {
  //getUsers();
  const serviceAccount = require("./service-account.json");
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  auth
    .getClient()
    .then((client) => {
      const sheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = "1r6HUu3lM4FByTPoe3pFA1JF2ARvT8HyP5R2MGPbUiS8";
      const range = "Sheet1!A:Z";
      return sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
    })
    .then((response) => {
      const rows = response.data.values;
      if (rows.length) {
        console.log("Datas:");
        rows.forEach(async (row, index) => {
          const username = row[0];
          const totalHours = parseInt(row[1]);
          let totalHoursGave = parseInt(row[2]);

          if (totalHours > totalHoursGave) {
            const rangeToUpdate = `Sheet1!C${index + 1}`;
            await updateHours(rangeToUpdate, totalHours);
            totalHoursGave = totalHours;
          }

          console.log(
            `${username}: Total Hours - ${totalHours}, Total Hours Gave - ${totalHoursGave}`
          );
        });
      } else {
        console.log("no data");
      }
    })
    .catch((err) => {
      console.error("error reading", err);
    });
} catch (error) {
  console.error("Error: ", error);
}
console.log("end");
