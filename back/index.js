const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { Pool } = require("pg");
const app = express();
app.use(express.json());
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
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
app.get("/students", async (_req, res) => {
  let students;
  try {
    students = await Postgres.query("SELECT * FROM students");
  } catch (err) {
    console.log(err);
    return res.send("error");
  }

  res.json(students.rows);
});

//*POST
app.post("/students", async (req, res) => {
  try {
    await Postgres.query("INSERT INTO students(name) VALUES($1)", [
      req.body.name,
    ]);
  } catch (err) {
    console.log(err);
    return res.send("error");
  }
  console.log(req.body.name);
  res.json({
    message: `student ${req.body.name} added !`,
    studentsList: students,
  });
  // const checkStudents = students.find((student) => {
  //   return student.name === req.body.name;
  // });
  // if (checkStudents) {
  //   return res.status(400).json({
  //     error: `Error 400 bad request`,
  //     message: `student ${req.body.name} alreay exist !`,
  //   });
  // } else {
  //   students.push(req.body);
  //   res.json({
  //     message: `student ${req.body.name} added !`,
  //     studentsList: students,
  //   });
  // }
});

//* corps de code

app.get("*", (_req, res) => {
  res.send("error 404");
});
app.listen(8000, () => {
  console.log("linstening on port 8000");
});
