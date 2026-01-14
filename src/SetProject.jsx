import { useState } from "react";
import Frame from "./Components/MainFrame/Frame";

const SetProject = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [view, setView] = useState("list"); // "list" or "project"
  const [selectedProject, setSelectedProject] = useState(null);

  const addProject = () => {
    if (projectName.trim() === "") return;

    const newProject = {
      id: Date.now(),
      name: projectName,
    };

    setProjects([...projects, newProject]);
    setProjectName("");
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
    <div className="SetProject">
      {view === "list" && (
        <div className="project-list">
          <h2>My Projects</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button onClick={addProject}>Créer</button>
          </div>

          <ul>
            {projects.map((p) => (
              <li
                key={p.id}
                onClick={() => openProject(p)}
                style={{ cursor: "pointer", marginTop: "10px" }}
              >
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === "project" && selectedProject && (
        <div className="project-page">
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button className="back-btn" onClick={goBack}>
              ← Back
            </button>
            <h2>{selectedProject.name}</h2>
          </div>

          {/* AMINE TODO APP */}
          <Frame />
        </div>
      )}
    </div>
  );
};

export default SetProject;
