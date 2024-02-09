import {Link, Outlet} from "react-router-dom";
import { useUserContext } from "../hooks/ContextHooks";


const Layout = () => {

  const { user ,handleAutoLogin } = useUserContext();

  if (!user) {
    handleAutoLogin();
  }

  return (
    <>
      <header>
        <h1>My app</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              // Show these links only if the user is logged in
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/upload">Upload</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            )}
            {!user && (
              // Show the Login link only if the user is not logged in
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Copyright 2024 - NN</p>
      </footer>
    </>
  );
};

export default Layout;
