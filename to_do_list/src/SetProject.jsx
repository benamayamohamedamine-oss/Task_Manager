import { useState } from "react";
import Frame from "./Components/MainFrame/Frame";
import "./SetProject.css";

const SetProject = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [view, setView] = useState("list");
  const [selectedProject, setSelectedProject] = useState(null);
  const [theme, setTheme] = useState("light");

  const addProject = () => {
    if (projectName.trim() === "") return;

    setProjects([...projects, { id: Date.now(), name: projectName }]);
    setProjectName("");
  };

  const goBack = () => {
    setView("list");
    setSelectedProject(null);
  };

  return (
    <div className={`SetProject ${theme}`}>
      {/* THEME TOGGLE */}
      <div className="theme-toggle">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙 Dark" : "☀ Light"}
        </button>
      </div>

      {view === "list" && (
        <div className="project-list">
          <h2>My Projects</h2>

          <div className="project-input">
            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button onClick={addProject}>Create</button>
          </div>

          <ul>
            {projects.map((p) => (
              <li
                key={p.id}
                onClick={() => {
                  setSelectedProject(p);
                  setView("project");
                }}
              >
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === "project" && selectedProject && (
        <div className="project-page">
          <button className="back-btn" onClick={goBack}>
            ← Back
          </button>
          <h2>{selectedProject.name}</h2>
          <Frame />
        </div>
      )}
    </div>
  );
};

export default SetProject;
