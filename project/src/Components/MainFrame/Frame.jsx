import { useState,useEffect } from "react"
import Task from "../Task/Task"
import Comment from "../Comments/Comment"
import "./Frame.css"
import axios from "axios"
import { useParams } from "react-router-dom";

function Frame()
{
    const [current_task, setCurrent_task] = useState("")
    const [tasks, setTasks] = useState([])
    const [comments, setComments] = useState([])
    const params = useParams();
    useEffect(()=>{
        axios.get('http://localhost:5000/comments')
        .then((response)=>{
            setComments(response.data)
        })

        axios.get(`http://localhost:5000/tasks/${params.id}`).then((response)=>{
            setTasks(response.data)
        });//
    },[params.id])

    function get_current_task(value)
    {
        setCurrent_task(value)
    }

    function handleAdd()
    {
        //if (current_task.trim() === "") return

        //setTasks([...tasks, {key :tasks.length, state : false, description : current_task}])
        //setCurrent_task("")

        axios.post('http://localhost:5000/tasks', {id :Date.now(),projectId:params.id, state : false, description : current_task}).then((response)=>{
            setTasks(response.data)
            setCurrent_task("")
        }); 
    }

    function handleState(key)
    {
        const updatedTask = tasks.map((task)=>{
            if (task.id === key) return {...task, state: !task.state}
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
                    return <div className="task" key={tasks.id} onClick={()=> {handleState(tasks.id)}}><Task state={tasks.state} description={tasks.description} /></div>
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