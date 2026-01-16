import "./TaskStyle.css"
function Task({state, description})
{

    return(
        <div className="task_container">
            <input type="checkbox" checked = {state} onChange={()=> {}}/> &nbsp; {description}
            <span style={{ marginLeft: "10px" }}>{description}</span>
        </div>
    )
}

export default Task