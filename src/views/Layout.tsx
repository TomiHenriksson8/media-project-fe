import {Link, Outlet} from "react-router-dom";
import { useUserContext } from "../hooks/ContextHooks";
import SearchBar from "../components/SearchBar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiSilence } from "react-icons/gi";
import { useNotification } from "../hooks/apiHooks";
import { useEffect, useState } from "react";
import { NotificationResponse } from "../types/MessageTypes";


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

  useEffect(() => {
    notififications();
  }, [user]);

  return (
      <div className="min-h-screen flex flex-col">
    <header className="relative p-2 z-10 bg-slate-900">
      <nav className="navbar">
        <ul className="flex flex-wrap justify-between items-center list-none">
          <li className="m-4">
            <Link className="block text-white text-center no-underline" to="/">
              <div className="logo-container flex items-center text-3xl sm:text-6xl">
                <GiSilence className="text-yellow-300"/>
              </div>
            </Link>
          </li>

          <div className="search-bar-container w-full flex justify-center my-2 md:my-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:w-auto z-20">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-6 m-4">
            {user ? (
              <>
                <Link className="block text-white text-center no-underline" to="/upload">
                <button className="upload-btn bg-yellow-200 text-slate-700 p-2 rounded-md font-medium hover:bg-yellow-300">Upload</button>
                </Link>
                <Link className="block text-white text-center no-underline relative" to='/notification'>
                  {noti && noti.count > 0 && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full absolute -top-1 -right-1 text-xs flex items-center justify-center animate-bounce" style={{ minWidth: '20px', height: '20px' }}>
                      {noti.count}
                    </div>
                  )}
                  <IoMdNotificationsOutline className="notification-icon text-2xl sm:text-3xl text-yellow-400 mr-1"/>
                </Link>
                <Link className="block text-white text-center no-underline" to="/profile">
                  <img className="profile-icon w-8 sm:w-10 rounded-full" src="https://place-hold.it/170x170.jpg&text=Pic2&fontsize=0" alt="Profile" />
                </Link>
                <Link className="block text-white text-center no-underline" to="/logout">
                  <button className="logout-container bg-gray-700 p-2 rounded-md font-medium">Logout</button>
                </Link>
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
      <Outlet />
    </main>

    <footer className="bg-slate-900 text-white p-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="max-w-xs text-sm">We are dedicated to providing the best experience for our users, offering top-notch solutions and content.</p>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-4">Links</h2>
          <ul>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
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
