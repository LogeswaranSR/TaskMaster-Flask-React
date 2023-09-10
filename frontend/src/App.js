import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import TaskList from "./components/TaskList"

function App() {

  const [tasks, setTasks] = useState([]);

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
  return (
    <div className="App">
      <h1>TaskMaster Sample Website</h1>
      <TaskList tasks={tasks}/>
    </div>
  );
}

export default App;
