import React from 'react'
import APIService from "./APIService"

function TaskList(props) {

  const editTask = (task) => {
    props.editTask(task)
  }

  const deleteTask = (task) => {
    APIService.DeleteTask(task.id)
    .then(() => props.deleteData(task))
    .catch((err) => console.log(err))
  }

  return (
    <div key="tasks">
      <table class="table table-dark table-bordered w-auto">
        <thead>
            <tr>
                <th>ID</th>
                <th>Task</th>
                <th>Date Added</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {props.tasks.map(task => {
            return (
            <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.content}</td>
                <td>{task.date_created}</td>
                <td>
                  <button className='btn btn-primary'
                  onClick={() => editTask(task)}>Update</button>
                  <button className='btn btn-danger'
                  onClick={() => deleteTask(task)}>Delete</button>
                </td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList