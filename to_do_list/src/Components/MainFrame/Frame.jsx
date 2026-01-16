import { useState, useEffect } from "react"
import Task from "../Task/Task"
import Comment from "../Comments/Comment"
import "./Frame.css"

function Frame() {
    const [current_task, setCurrent_task] = useState("")
    const [tasks, setTasks] = useState([])
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // API URL
    const API_URL = "http://localhost:5000/api"

    // Fetch tasks from backend
    const fetchTasks = async () => {
        try {
            console.log("Fetching tasks...")
            const response = await fetch(`${API_URL}/tasks`) // FIXED: 'tasks' not 'taks'
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            
            const data = await response.json()
            console.log("Tasks data:", data)
            
            // Handle different response formats
            if (Array.isArray(data)) {
                setTasks(data)
            } else if (data.tasks && Array.isArray(data.tasks)) {
                setTasks(data.tasks)
            } else {
                setTasks(data || [])
            }
        } catch (error) {
            console.error("Error fetching tasks:", error)
            setError("Failed to load tasks")
            setTasks([])
        }
    }

    // Fetch comments from backend
    const fetchComments = async () => {
        try {
            console.log("Fetching comments...")
            const response = await fetch(`${API_URL}/comments`)
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            
            const data = await response.json() // FIXED: Added await
            console.log("Comments data:", data)
            
            // Handle different response formats
            if (Array.isArray(data)) {
                setComments(data)
            } else if (data.comments && Array.isArray(data.comments)) {
                setComments(data.comments)
            } else {
                setComments(data || [])
            }
        } catch (error) {
            console.error("Error fetching comments:", error)
            setComments([])
        }
    }

    // Load data
    useEffect(() => {
        const loadData = async () => {
            console.log("Loading initial data...")
            await fetchTasks()
            await fetchComments()
            setLoading(false)
        }
        loadData()
    }, [])

    function get_current_task(value) {
        setCurrent_task(value)
    }

    async function handleAdd() {
        if (current_task.trim() === "") return

        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {  // FIXED: 'headers' not 'header'
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: current_task,
                    userId: 1
                })
            })

            const data = await response.json()

            if (response.ok) {
                console.log("Task added successfully:", data)
                // Refresh tasks list
                await fetchTasks()
                setCurrent_task("")
            } else {
                console.error("Error response:", data)
                alert(`Error: ${data.error || "Failed to add task"}`)
            }
        } catch (error) {
            console.error("Network error:", error)
            alert("Cannot connect to server. Make sure backend is running on port 5000.")
        }
    }

    async function handleState(taskId) {
        try {
            console.log("Toggling task:", taskId)
            const response = await fetch(`${API_URL}/tasks/${taskId}/toggle`, {
                method: "PATCH"
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            console.log("Toggle response:", data)

            if (response.ok) {
                // Update local state
                const updatedTasks = tasks.map((task) => {
                    if (task.id === taskId) { // FIXED: Use 'id' not 'key'
                        return { 
                            ...task, 
                            state: data.state || data.task?.state || !task.state 
                        }
                    }
                    return task
                })
                setTasks(updatedTasks)
            }
        } catch (error) {
            console.error("Error toggling task:", error)
        }
    }

    async function handleAddComment() {
        const commentText = prompt("Enter your comment:")
        if (!commentText) return

        try {
            const response = await fetch(`${API_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: "Current_User",
                    comment: commentText,
                    userId: 1
                })
            })

            const data = await response.json()

            if (response.ok) {
                console.log("Comment added:", data)
                // Refresh comments list
                await fetchComments()
            } else {
                console.error("Error adding comment:", data)
            }
        } catch (error) {
            console.error("Network error:", error)
        }
    }

    if (loading) {
        return <div className="Container">Loading data from server...</div>
    }

    if (error) {
        return (
            <div className="Container">
                <h1>To Do List</h1>
                <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>
                    <h3>Error: {error}</h3>
                    <p>Make sure:</p>
                    <ol>
                        <li>Backend server is running (check terminal)</li>
                        <li>Backend is on http://localhost:5000</li>
                        <li>You ran: <code>cd backend && npm run dev</code></li>
                    </ol>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            </div>
        )
    }

    return (
        <div className="Container">
            <h1>To Do List</h1>
            
            <div className="server-status">
                <small>Backend: {API_URL} {tasks.length > 0 ? '✅ Connected' : '❌ Not connected'}</small>
            </div>
            
            <label htmlFor="">
                <strong>Submit a Task</strong> &nbsp;
                <input 
                    type="text" 
                    value={current_task} 
                    onChange={(e) => { get_current_task(e.target.value) }} 
                    placeholder="What needs to be done?"
                />
                <button onClick={handleAdd}>Add Task</button>
            </label> 
            
            <div className="Tasks_List">
                {tasks.length === 0 ? (
                    <p>No tasks yet. Add one above!</p>
                ) : (
                    tasks.map((task) => {
                        return (
                            <div 
                                className="task" 
                                key={task.id || task.key} // FIXED: Use 'id' or 'key'
                                onClick={() => { handleState(task.id || task.key) }}
                            >
                                <Task 
                                    state={task.state} 
                                    description={task.description} 
                                />
                            </div>
                        )
                    })
                )}
            </div>
            
            <div className="Comments_Container">
                <div className="comments-header">
                    <h3>Comments ({comments.length})</h3>
                    <button onClick={handleAddComment}>Add Comment</button>
                </div>
                
                {comments.length === 0 ? (
                    <p>No comments yet. Be the first to comment!</p>
                ) : (
                    comments.map((comment, index) => {
                        return (
                            <Comment 
                                key={comment.id || index}
                                user_name={comment.userName || comment.user_name} // FIXED: Handle both
                                comment={comment.comment} 
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Frame