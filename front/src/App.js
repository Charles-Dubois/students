import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [students, setStudents] = useState("");
  const [studentsAPI, setStudentsAPI] = useState([]);
  const handleChange = (myEvent) => {
    setStudents(myEvent.target.value);
  };

  function onMount() {
    axios
      .get("http://localhost:8000/students")

      .then((res) => setStudentsAPI(res))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    onMount();
  }, []);

  const handleClick = () => {
    axios
      .post("http://localhost:8000/students", {
        name: `${students}`,
      })
      .catch((err) =>
        alert(`${err}\nDescription : this student already exists`)
      );
    onMount();
  };

  const renderList = () => {
    return studentsAPI.data ? (
      studentsAPI.data.map((res, i) => <li key={i}>{res.name}</li>)
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
