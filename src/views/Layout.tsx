import { useState } from "react";
import {Link, Outlet} from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultList";

const Layout = () => {

  type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
    };
    phone: string;
    website: string;
    company: {
      name: string;
    };
  };

  


  const [results, setResults] = useState<User[]>([]);

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

            <div className="search-bar-container">
              <SearchBar  setResults={setResults}/>
              <SearchResultsList results={results}/>
            </div>

            {/* Group for the right-aligned items */}
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
            </div>
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
