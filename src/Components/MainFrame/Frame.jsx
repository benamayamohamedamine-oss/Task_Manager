import { useState } from "react"
import Task from "../Task/Task"
import Comment from "../Comments/Comment"
import "./Frame.css"

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

    const [comments, setComments] = useState([
        {
            key : "amine_1",
            user_name : "amine",
            comment : "keep it simple"
        },

        {
            key : "ahmed_1",
            user_name : "ahmed",
            comment : "bad to_do_list XDD"
        },

        {
            key : "9lawi_tab0un_1",
            user_name : "9lawi_tab0un",
            comment : "9lawi 9lawi taboun >:D"
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
            <div className="Comments_Container">
                {comments.map((e) => {
                    return <Comment user_name={e.user_name} comment={e.comment}/>
                })

                }
            </div>
        </div>
    )

}

export default Frame