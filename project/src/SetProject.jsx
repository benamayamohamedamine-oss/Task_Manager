import { useState, useEffect, use } from "react";
import "./SetProject.css";
import axios from "axios";

function SetProject() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [view, setView] = useState("list"); // list | project

  useEffect(() => {
    axios.get("http://localhost:5000/projects").then((response) => {
      setProjects(response.data);
    });
  });
  const createProject = () => {
    //if (!projectName.trim()) return;

    //const name = projectName.trim();

   // if (projects.some((p) => p.name === name)) {
    //  alert("Project already exists");
    //  return;
    //}

    //setProjects([...projects, { id: Date.now(), name }]);
    //setProjectName("");

    axios.post("http://localhost:5000/projects", { id: Date.now(), name: projectName }).then((response) => {
      setProjects(response.data);
      setProjectName("");
    });

  };

  const openProject = (project) => {
    setSelectedProject(project);
    setView("project");
  };

  const goBack = () => {
    setView("list");
    setSelectedProject(null);
  };

  return (
    <div className={`SetProject ${view === "project" ? "slide-left" : ""}`}>
      
      {}
      {view === "list" && (
        <>
          <h1>Projects Creation</h1>

          <input
            type="text"
            className="projectName"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <button className="create-btn" onClick={createProject}>
            Créer
          </button>

          <main className="projects-container">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-zone"
                onClick={() => openProject(project)}
              >
                {project.name}
              </div>
            ))}
          </main>
        </>
      )}

      {}
      {view === "project" && selectedProject && (
        <div className="project-page">
          <h2>{selectedProject.name}</h2>
          <p>This is your project workspace.</p>

          <button className="back-btn" onClick={goBack}>
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

export default SetProject;
