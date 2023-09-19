import React, { useState, useEffect } from 'react'
import APIService from "./APIService"

function Form(props) {

  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(props.task.content);
  },[props.task])
  
  const updateTask = () => {
    APIService.UpdateTask(props.task.id, {content})
    .then(resp => props.updateData(resp))
    .catch(err => console.log(err))
  }

  const insertTask = () => {
    APIService.InsertTask({content})
    .then(resp => props.insertData(resp))
    .catch(err => console.log(err))
  }


  return (
    <div>
        {props.task ? (
          <div className = "mb-3">
              <label htmlFor = "title" className='form-label' >Task</label>
              <input type='text' className="form-control" 
              value={content} 
              placeholder = "Please Enter Task" 
              onChange = {(e) => setContent(e.target.value)}/>
              {props.task.id ?
              <button className = "btn btn-success mt-3"
              onClick={updateTask}>Update</button>
              :
              <button className = "btn btn-success mt-3"
              onClick={insertTask}>Insert</button>}
          </div>
        ) : null
        }
    </div>
  )
}

export default Form