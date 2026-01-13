import { useState } from "react"
import Task from "./Task"
import "./style.css"

function Frame()
{
    const [current_task, setCurrent_task] = useState("")
    const [tasks, setTasks] = useState([
        {
            key : 0,
            state : false,
            description : "Train"
            
        },
        {
            key : 1,
            state : true,
            description : "Eat healthy"
        }
    ]

    )

    function get_current_task(value)
    {
        setCurrent_task(value)
    }

    function handleAdd()
    {
        if (current_task.trim() === "") return

        setTasks([...tasks, {key :tasks.length, state : false, description : current_task}])
        setCurrent_task("")
    }

    function handleState(key)
    {
        const updatedTask = tasks.map((task)=>{
            if (task.key === key) return {...task, state: !task.state}
            return task
        })
        setTasks(updatedTask)
        
    }

    return(
        <div className="Container">
            <h1>To Do List</h1>
            <label htmlFor="">
                <strong>Submit a Task</strong> &nbsp;
                <input type="text" value={current_task} onChange={(e)=> {get_current_task(e.target.value)}} />
                <button onClick={handleAdd}>Add Task</button>
            </label> 
            <div className="Tasks_List">
                {tasks.map((tasks) => {
                    return <div className="task" key={tasks.key} onClick={()=> {handleState(tasks.key)}}><Task state={tasks.state} description={tasks.description} /></div>
                })}
            </div>
        </div>
    )

}

export default Frame