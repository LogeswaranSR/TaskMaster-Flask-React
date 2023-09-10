import React from 'react'

function TaskList(props) {
  return (
    <div key="tasks">
        <table>
            <tr>
                <th>ID</th>
                <th>Task</th>
                <th>Date Added</th>
            </tr>
            {props.tasks.map(task => {
            return (
            <tr>
                <td>{task.id}</td>
                <td>{task.content}</td>
                <td>{task.date_created}</td>
            </tr>
            )
        })}
      </table>
    </div>
  )
}

export default TaskList