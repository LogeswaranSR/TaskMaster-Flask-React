import './App.css';
import {useState, useEffect} from "react";
import TaskList from "./components/TaskList"
import UpdateForm from "./components/UpdateForm";

function App() {

  const [tasks, setTasks] = useState([]);
  const [editedTask, seteditedTask] = useState(null);

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

  const updateData = (task) => {
    const new_task = tasks.map(oldtask => {
      if(oldtask.id === task.id){
        return task
      } else {
        return oldtask
      }
    })
    setTasks(new_task)
    seteditedTask(null);
  }

  return (
    <div className="App">
      <h1>TaskMaster Sample Website</h1>
      <TaskList tasks={tasks} editTask = {editTask}/>
      {editedTask ? <UpdateForm task={editedTask} updateData={updateData}/> : null}
    </div>
  );
}

export default App;
