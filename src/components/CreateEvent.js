import React from "react";
import "../index.css";

export default class CreateEvent extends React.Component{
    render(){
        return (
            <div className="createForm">
            <h2> Create Your Event </h2>
            <form id='todo-form'>
                <label htmlFor='title'>Event Name: </label>
                <input name='title'/>
                <br />
                <br />
                <label htmlFor='description'>Description: </label>
                <input name='description'/>
                <br />
                <br />
                <button type='submit'>Submit</button>
      </form>
            </div>

        )
    }
}



// REFERENCE FORM FORMATTING

// <form id='todo-form' onSubmit={handleSubmit}>
//        <label htmlFor='taskName'>Task Name:</label>
//        <input name='taskName' value={taskName} onChange={handleChange}/>
//
//        <label htmlFor='assignee'>Assign To:</label>
//        <input name='assignee' value={assignee} onChange={handleChange}/>
//
//        <button type='submit'>Submit</button>
//        <Link to='/'>Cancel</Link>
//      </form> 