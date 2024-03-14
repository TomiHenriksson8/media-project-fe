import { useNavigate } from "react-router-dom";
import { MediaItemWithOwner } from "../types/DBTypes";
import Likes from "./Likes";
import { useUserContext } from "../hooks/ContextHooks";

const MediaRow = ({ item }: {item: MediaItemWithOwner}) => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  // Navigate to user profile
  const handleProfileClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent event from propagating further
    if (user?.username === item.username) {
      navigate(`/profile`);
    } else {
      navigate(`/user/${item.username}`);
    }
  };

  // Navigate to media post
  const handleMediaClick = () => {
    navigate(`/post`, { state: item });
  };

  return (

    <div className="media-item w-full max-w-96 mb-7 hover:bg-gray-150 dark:hover:bg-slate-600 bg-gray-125 dark:bg-slate-700 dark:text-white rounded-lg shadow-custom flex flex-col items-center" key={item.media_id}>
      <div onClick={handleMediaClick} className="hover:  w-full flex flex-col items-center cursor-pointer">
        <div className="media-header w-full flex items-center pl-5 pr-3 pt-3 cursor-pointer" onClick={handleProfileClick}>
          <img className="profile-icon w-10 rounded-full border border-gray-400 border-solid" src="./blank-pfp.png" alt="Profile" />
          <span className="username ml-3 text-lg hover:underline">{item.username}</span>
        </div>
        <img src={item.thumbnail} className="media-thumbnail pt-3 px-2 "/>
        <div className='w-full text-center'>
          <p className='p-2 font-medium'>{item.title}</p>
          <span className='block pb-2'>{item.description}</span>
        </div>
      </div>
      <div className="media-interaction w-full  border-t border-gray-500 flex justify-center gap-4 bg-gray-125 dark:bg-slate-700 rounded-b-lg">
        <Likes item={item} />
      </div>
    </div>


  );
};

export default MediaRow;
