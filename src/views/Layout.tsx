import {Link, Outlet} from "react-router-dom";
import { useThemeContext, useUserContext } from "../hooks/ContextHooks";
import SearchBar from "../components/SearchBar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiSilence } from "react-icons/gi";
import { useNotification } from "../hooks/apiHooks";
import { useEffect, useState } from "react";
import { NotificationResponse } from "../types/MessageTypes";
import { FaArrowUp } from "react-icons/fa";



const Layout = () => {

  const { user ,handleAutoLogin } = useUserContext();
  const { getUnreadNotificationsCount } = useNotification();
  const [noti, setNoti] = useState<NotificationResponse | null>();
  


  if (!user) {
    handleAutoLogin();
  }

  const notififications = async () => {
    const token = localStorage.getItem('token');
    if (!token || !user){
      return
    }
    try {
      const notifications =  await getUnreadNotificationsCount(user.user_id, token);
      setNoti(notifications);
    } catch (e) {
      console.error(e);
      setNoti(null);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  useEffect(() => {
    notififications();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative p-2 z-10 bg-slate-900 dark:bg-slate-950">
        <nav className="navbar">
          <ul className="flex flex-wrap justify-between items-center list-none mlg:flex-row flex-col">
            <div className="flex flex-1">
              <Link className="block text-white text-center no-underline" to="/">
                <div className="logo-container flex text-6xl ">
                  <GiSilence className="text-yellow-300"/>
                </div>
              </Link>

            </div>

            <div className="search-bar-container flex w-full  justify-center my-2 mlg:my-0 mlg:absolute mlg:left-1/2 mlg:-translate-x-1/2 mlg:w-auto z-20">
              <SearchBar />
            </div>

            <div className="flex items-center space-x-8 my-4 mr-4">
              {user ? (
          <>
            <Link className="block text-white text-center no-underline" to="/upload">
              <button className="upload-btn bg-yellow-200 dark:bg-yellow-300 text-slate-700 dark:text-slate-800 p-2 rounded-md font-medium hover:bg-yellow-300">Upload</button>
            </Link>
            <Link className="block text-white text-center no-underline relative" to='/notification'>
              {noti && noti.count > 0 && (
              <div className="bg-red-500 text-white px-2 py-1 rounded-full absolute -top-1 -right-1 text-xs flex items-center justify-center animate-bounce" style={{ minWidth: '20px', height: '20px' }}>
                {noti.count}
              </div>
              )}
              <IoMdNotificationsOutline className="notification-icon text-3xl text-yellow-400 mr-1"/>
            </Link>
            <div className="flex items-center space-x-4">
              <Link className="block text-white text-center no-underline" to="/profile">
                <img className="profile-icon w-10 rounded-full" src="/public/blank-pfp.png" alt="Profile" />
              </Link>
              <Link className="block text-white text-center no-underline" to="/logout">
                <button className="logout-container bg-gray-700 p-2 rounded-md font-medium">Logout</button>
              </Link>
            </div>
          </>
        ) : (
          <Link className="block text-slate-700 text-center no-underline" to="/login">
            <button className="bg-yellow-200 p-2 rounded-md font-medium">Login / Register</button>
          </Link>
        )}
            </div>
          </ul>
        </nav>
      </header>

      <main className="flex-grow relative">
        <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full opacity-50 hover:opacity-100 transition-opacity duration-300">
          <FaArrowUp className="text-[22px]" />
        </button>
        <Outlet />
      </main>

      <footer className="bg-slate-900 dark:bg-slate-950 text-white p-10">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="max-w-xs text-sm">Join our community where you can share your moments, discover incredible media from around the world, and connect with creators just like you.</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Links</h2>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/login" className="hover:underline">Login</a></li>
              <li><a href="/login" className="hover:underline">Register</a></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p>Email: info@yoursite.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">Facebook</a>
              <a href="#" className="hover:text-gray-400">Twitter</a>
              <a href="#" className="hover:text-gray-400">Instagram</a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm">
          <p>Copyright © 2024 NN. All rights reserved.</p>
        </div>
      </footer>
  </div>

  );
};

export default Layout;
