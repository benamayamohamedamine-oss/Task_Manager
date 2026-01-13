const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin:'*'
}));
app.use(express.json());

const projects = [{id: 1, name: 'Sample Project'},{id: 2, name: 'Another Project'}];
const tasks = [{id: 1, projectId: 1,state:true, description: 'Task 1 for Project 1'},
               {id: 2, projectId: 1,state:true, description: 'Task 2 for Project 1'},
               {id: 3, projectId: 2,state:true, description: 'Task 1 for Project 2'}];

const comments = [
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

app.post('/projects', (req, res) => {
    projects.push(req.body);
    res.send(projects);
});

app.get('/projects', (req, res) => {
    res.send(projects);
});

app.get('/tasks/:projectId', (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    res.send(projectTasks);
});

app.post('/tasks', (req, res) => {
    tasks.push(req.body);
    res.send(tasks);
});
app.get('/comments', (req, res) => {
    res.send(comments);
});

app.listen(5000, () => {
  console.log('Server is running on  http://localhost:5000');
});