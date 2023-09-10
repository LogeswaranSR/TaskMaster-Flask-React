import './App.css';
import {useState, useEffect} from "react";
import TaskList from "./components/TaskList"
import Form from "./components/Form";

function App() {

  const [tasks, setTasks] = useState([]);
  const [editedTask, seteditedTask] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000',{
      'method':'GET',
      headers: {
        "Content-Type":'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setTasks(resp))
    .catch(err => console.log(err))
  },[])

  const editTask = (task) => {
    seteditedTask(task);
  }

  return (
    <div className="App">
      <h1>TaskMaster Sample Website</h1>
      <TaskList tasks={tasks} editTask = {editTask}/>
      <Form task={editTask}/>
    </div>
  );
}

export default App;
