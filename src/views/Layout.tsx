import {Link, Outlet} from "react-router-dom";
import { useUserContext } from "../hooks/ContextHooks";
import SearchBar from "../components/SearchBar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiSilence } from "react-icons/gi";
import { MdLogout } from "react-icons/md";

const Layout = () => {

  const { user ,handleAutoLogin } = useUserContext();


  if (!user) {
    handleAutoLogin();
  }

  return (
    <>
      <header className=" relative p-2 z-10 bg-slate-900">
        <nav className="navbar">
          <ul className="flex justify-between items-center list-none">
            <div className="left-group flex items-center">
              <li className=" m-4">
                <Link className="block text-white text-center no-underline" to="/">
                  <div className="logo-container flex items-center text-5xl ml-11 ">
                    <GiSilence  className="logo -mt-1 text-yellow-300"/>
                    <h1 className=" text-5xl ml-1">lolo</h1>
                  </div>
                </Link>
              </li>
            </div>

            <div className="search-bar-container z-5">
              <SearchBar/>
            </div>

            {user && (
              // Show these links only if the user is logged in
              <>
                <div className="right-group flex items-center mr-11">
                  <li className=" m-4">
                    <Link className="block text-white text-center no-underline" to="/upload">
                      <button className="upload-btn bg-yellow-200 text-slate-700 text-3x1  p-2 mt-2">Upload</button>
                    </Link>
                  </li>
                  <li className=" m-4">
                    <Link className="block text-white text-center no-underline" to='/notification'>
                      <IoMdNotificationsOutline className="notification-icon text-3xl text-yellow-400 mt-1" />
                    </Link>
                  </li>
                  <li className=" m-4">
                    <Link className="block text-white text-center no-underline" to="/profile">
                      <img className="profile-icon w-10 rounded-full" src="https://place-hold.it/170x170.jpg&text=Pic2&fontsize=0" alt="Profile" />
                    </Link>
                  </li>
                  <li className=" m-4">
                    <Link className="block text-white text-center no-underline" to="/logout">
                      <div className="logout-container bg-gray-700 p-2 flex justify-between gap-1">
                        <p>Logout</p>
                        <MdLogout className="logout-icon mt-1"/>
                      </div>
                      </Link>
                  </li>
                </div>
              </>
            )}
            {!user && (
              <li className=" m-4">
                <Link className="block text-white text-center no-underline" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="relative">
        <Outlet />
      </main>
      <footer className="bg-slate-900 h-56">
        <p>Copyright 2024 - NN</p>
      </footer>
    </>
  );
};

export default Layout;
