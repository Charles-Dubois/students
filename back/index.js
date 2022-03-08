const express = require("express");
const app = express();
app.use(express.json());
//* corps de code

const students = [];

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.get("/", (_req, res) => {
  res.send(
    "students API: utilisez le endpoint( /students ) pour afficher tous les élèves"
  );
});

//*GET
app.get("/students", (_req, res) => {
  res.send(students);
});

//*POST
app.post("/students", (req, res) => {
  students.push(req.body);
  res.json({
    message: `student ${req.body.name} added !`,
    studentsList: students,
  });
});

//* corps de code
// catch not found
app.get("*", (_req, res) => {
  res.send("error 404");
});
app.listen(8000, () => {
  console.log("linstening on port 8000");
});