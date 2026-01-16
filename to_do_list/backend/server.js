const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sample data
let tasks = [
  { id: 1, description: 'Train', state: false },
  { id: 2, description: 'Eat healthy', state: true }
];

let comments = [
  { id: 1, userName: 'amine', comment: 'keep it simple' },
  { id: 2, userName: 'ahmed', comment: 'bad to_do_list XDD' }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Get all tasks - returns array directly
app.get('/api/tasks', (req, res) => {
  res.json(tasks); // Returns array directly
});

// Create new task
app.post('/api/tasks', (req, res) => {
  const { description, userId } = req.body;
  
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }
  
  const newTask = {
    id: tasks.length + 1,
    userId: userId || 1,
    description,
    state: false
  };
  
  tasks.push(newTask);
  res.json(newTask); // Returns the new task object
});

// Toggle task state
app.patch('/api/tasks/:id/toggle', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  task.state = !task.state;
  res.json({ 
    message: 'Task toggled', 
    task: task,
    state: task.state 
  });
});

// Get all comments - returns array directly
app.get('/api/comments', (req, res) => {
  res.json(comments); // Returns array directly
});

// Add new comment
app.post('/api/comments', (req, res) => {
  const { userName, comment, userId } = req.body;
  
  if (!userName || !comment) {
    return res.status(400).json({ 
      error: 'Username and comment are required' 
    });
  }
  
  const newComment = {
    id: comments.length + 1,
    userName,
    comment,
    userId: userId || 1
  };
  
  comments.push(newComment);
  res.json(newComment); // Returns the new comment
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`📝 Tasks: http://localhost:${PORT}/api/tasks`);
  console.log(`💬 Comments: http://localhost:${PORT}/api/comments`);
});