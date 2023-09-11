import React, { useState } from 'react'

function Form(props) {

  const [task, setTask] = useState(props.task ? props.task.content : null);

  return (
    <div>
        {props.task ? (
          <div className = "mb-3">
              <label htmlForm = "title" className='form-label' value={task} >Task</label>
              <input type='text' className="form-control" placeholder = "Please Enter Task"/>
          </div>
        ) : null
        }
    </div>
  )
}

export default Form