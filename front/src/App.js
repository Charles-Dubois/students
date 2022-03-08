import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [students, setStudents] = useState("");
  const [studentsAPI, setStudentsAPI] = useState([]);
  const handleChange = (myEvent) => {
    setStudents(myEvent.target.value);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/students")
      .then((res) => setStudentsAPI(res.data));
  }, []);
  const checkStudent = studentsAPI.find((student) => {
    if (student.name === students) {
      return true;
    }
  });

  const handleClick = () => {
    axios.post("http://localhost:8000/students", {
      name: `${students}`,
    });
  };

  const renderList = () => {
    console.log(studentsAPI);
    return studentsAPI.length > 0 ? (
      studentsAPI.map((res, i) => <li key={i}>{res.name}</li>)
    ) : (
      <h2>Liste vide</h2>
    );
  };
  return (
    <div>
      <ul>{renderList()}</ul>
      <form>
        <input type="text" onChange={(e) => handleChange(e)} />
        <button onClick={() => handleClick()}>Click</button>
      </form>
    </div>
  );
}
