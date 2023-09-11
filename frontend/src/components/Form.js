import React, { useState, useEffect } from 'react'
import APIService from "./APIService"

function Form(props) {

  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(props.task.content);
  },[props.task])
  
  const updateArticle = () => {
    APIService.UpdateArticle(props.task.id, {content})
    .then(resp => props.updateData(resp))
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
              <button className = "btn btn-success mt-3"
              onClick={updateArticle}>Update</button>
          </div>
        ) : null
        }
    </div>
  )
}

export default Form