import './App.css';
import SetProject from './SetProject';
import Frame from './Components/MainFrame/Frame';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<SetProject />}/>
        <Route path='/frame/:id' element={<Frame />}/>
      </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
