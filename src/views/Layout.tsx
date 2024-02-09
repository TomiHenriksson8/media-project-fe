import {Link, Outlet} from "react-router-dom";
import { useUserContext } from "../hooks/ContextHooks";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultList";


const Layout = () => {

  const { user ,handleAutoLogin } = useUserContext();

  if (!user) {
    handleAutoLogin();
  }

  return (
    <>
      <header>
        <nav className="navbar">
          <ul>
            <div className="left-group">
              <li>
                <Link to="/">Home</Link>
              </li>
            </div>

            {/* <div className="search-bar-container">
              <SearchBar  setResults={setResults}/>
              <SearchResultsList results={results}/>
            </div> */}

            {user && (
              // Show these links only if the user is logged in
              <>
                <div className="right-group">
                  <li>
                    <Link to="/upload">
                      <button className="upload-btn">Upload</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">
                      <img className="profile-icon" src="https://place-hold.it/170x170.jpg&text=Pic2&fontsize=0" alt="Profile" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </div>
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
