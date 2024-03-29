import { useState } from "react";
import UserMediaPost from "../components/UserMediaPost";
import { useThemeContext, useUserContext } from "../hooks/ContextHooks";
import FollowingFollowers from "../components/FollowingFollowers";
import LikedPosts from "../components/LikedPosts";
import { FaHeart } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";

const Profile = () => {
  const [followStatusChanged, setFollowStatusChanged] = useState(false);
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState('posts')
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-lg font-bold text-left mb-3 ml-3 dark:text-white">Profile</h2>
      {user && (
        <div>

          <div className="bg-white dark:bg-slate-700 shadow-md rounded-lg p-6 mb-6 text-white">
            <div className="flex flex-row justify-between gap-6">
              <img src='./blank-pfp.png' alt={user.username} className="w-20 h-20 rounded-full border border-gray-400 border-solid"/>
              <h3 className="font-bold mb-4 text-3xl mt-4 text-black dark:text-white">{user.username}</h3>
              <div>
                <button
                  onClick={toggleTheme}
                  className={`${
                  theme === 'dark' ? 'text-yellow-300 bg-slate-900' : 'text-slate-900 bg-yellow-300 rounded-full'
                  } p-2 rounded-full transition-colors duration-300`}
                  >
                    {theme === 'dark' ? 'Light 🌞' : 'Dark 🌜'}
                </button>
              </div>
            </div>
            <FollowingFollowers user={user} followStatusChanged={followStatusChanged} />
            <p className="text-gray-600 dark:text-gray-200 pt-3"><span className="font-medium">Email:</span> {user.email}</p>
            <p className="text-gray-600 dark:text-gray-200 pt-2"><span className="font-medium">Created:</span> {new Date(user.created_at).toLocaleDateString('fi-FI')}</p>
          </div>
          <div className="flex flex-col md:flex-row mb-4">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex items-center justify-center gap-2  py-2 px-4 font-semibold rounded-lg text-center md:mr-0 md:w-1/2 ${activeTab === 'posts' ? 'bg-blue-500 dark:bg-slate-500 text-white' : 'bg-gray-200'}`}
              >
              <MdPermMedia className="text-gray-900 mr-2" />
              <span>Your Posts</span>
            </button>
            <button
              onClick={() => setActiveTab('likes')}
              className={`flex items-center justify-center gap-2 py-2 px-4 font-semibold rounded-lg text-center md:mr-0 md:w-1/2 ${activeTab === 'likes' ? 'bg-blue-500 dark:bg-slate-500 text-white' : 'bg-gray-200'}`}
            >
              <FaHeart className="text-red-500 mr-2" />
              <span>Liked</span>
            </button>
          </div>


          {activeTab === 'posts' && <UserMediaPost />}
          {activeTab === 'likes' && <LikedPosts />}
        </div>
      )}
    </div>
  );
};

export default Profile;
