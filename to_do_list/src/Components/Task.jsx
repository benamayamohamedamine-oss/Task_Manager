import "./TaskStyle.css"
function Task({state, description})
{

    return(
        <div className="task_container">
            <input type="checkbox" checked = {state} onChange={()=> {}}/> &nbsp; {description}
        </div>
    )
}

export default Task