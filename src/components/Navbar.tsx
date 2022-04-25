import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
        <nav className="nav-top">
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
        </nav>
    </>
  )
}
