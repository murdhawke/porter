// (A) LOAD MODULES
// npm install mysql
// https://www.npmjs.com/package/mysql
const mysql = require("mysql"),
      fs = require("fs");

// (B) CONNECT TO DATABASE - CHANGE SETTINGS TO YOUR OWN!
const db = mysql.createConnection({
  host: "localhost",
  user: "amos",
  password: "amos1023",
  database: "gupload"
});

// (C) CREATE CSV FILE
const writer = fs.createWriteStream("export.csv");

// (D) EXPORT TO CSV
db.query("SELECT * FROM `users`")

// (D1) ON ERROR
.on("error", (err) => {
  console.error(err);
})

// (D2) WRITE ROW-BY-ROW
.on("result", (row) => {
  db.pause();
  let data = [];
  for (let i in row) { data.push(row[i]); }
  writer.write(data.join(",") + "\r\n");
  db.resume();
})

// (D3) CLOSE CONNECTION + FILE
.on("end", () => {
  db.end();
  writer.end();
});
