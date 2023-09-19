import './App.css';
import {useState, useEffect} from "react";
import TaskList from "./components/TaskList"
import Form from "./components/Form";

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

  const openForm= () => {
    seteditedTask({content:''})
  }

  const insertData = (task) => {
    const new_tasks = [...tasks, task]
    setTasks(new_tasks)
    seteditedTask(null)
  }

  const deleteData = (task) => {
    const new_task = tasks.filter(oldtask => {
      if (oldtask.id === task.id){
        return false
      } else {
        return true
      }
    })
    setTasks(new_task)
  }

  return (
    <div className="App">
      <div className='row'>
        <div className='col'>
          <h1>TaskMaster Sample Website</h1>
        </div>
        <div className='col'>
          <button className='btn btn-success'
          onClick={openForm}
          >Add Task</button>
        </div>
      </div>
      <TaskList tasks={tasks} editTask = {editTask} deleteData={deleteData}/>
      {editedTask ? <Form task={editedTask} updateData={updateData} insertData={insertData}/> : null}
    </div>
  );
}

export default App;
