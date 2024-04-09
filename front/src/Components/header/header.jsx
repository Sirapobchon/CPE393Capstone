import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./header.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        PawClaw
      </Link>
      <ul>
        <CustomLink to="/leaderboard">Leaderboard</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/GameMode">Game</CustomLink>
      </ul>
    </nav>
  );
}
//hello
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
