const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin:'*'
}));
app.use(express.json());

const projects = [{id: 1, name: 'Sample Project'},{id: 2, name: 'Another Project'}];

app.post('/projects', (req, res) => {
    projects.push(req.body);
    res.send(projects);
});

app.get('/projects', (req, res) => {
    res.send(projects);
});

app.listen(5000, () => {
  console.log('Server is running on  http://localhost:5000');
});