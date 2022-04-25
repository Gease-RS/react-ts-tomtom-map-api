import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="in">
      <nav>
        <main>
          <div className="title">
            <h2>TOMTOM MAPS</h2>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/map-model-one">Modelo 1</Link>
            </li>
            <li className="nav-item">
              <Link to="/map-model-two">Modelo 2</Link>
            </li>
            <li className="nav-item">
              <Link to="/map-model-three">Modelo 3</Link>
            </li>
          </ul>
        </main>
      </nav>
    </div>
  );
}

export default App;
