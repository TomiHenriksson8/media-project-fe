import { useNavigate } from "react-router-dom";
import { MediaItemWithOwner } from "../types/DBTypes";
import Likes from "./Likes";
import Comments from "./Comments";

const MediaRow = ({ item }: {item: MediaItemWithOwner}) => {
  const navigate = useNavigate();

  // Navigate to user profile
  const handleProfileClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent event from propagating further
    navigate(`/user/${item.username}`);
  };

  // Navigate to media post
  const handleMediaClick = () => {
    navigate(`/post`, { state: item });
  };

  return (

    <div className="media-item w-full max-w-96 mb-6 pt-8 pb-4 px-6 bg-white rounded-lg shadow-custom flex flex-col items-center cursor-pointer" key={item.media_id}>
      <div onClick={handleMediaClick}>
        <div className="media-header w-full flex items-center mb-3 cursor-pointer" onClick={handleProfileClick}>
          <img className="profile-icon w-10 rounded-full border border-gray-400 border-solid" src="./blank-pfp.png" alt="Profile" />
          <span className="username ml-3 text-lg hover:underline">{item.username}</span>
        </div>
        <img src={item.thumbnail} className="media-thumbnail" />
        <div className='w-full text-center'>
          <p className='p-2 font-medium'>{item.title}</p>
          <span className='block'>{item.media_type}</span>
        </div>
      </div>
      <div className="media-interaction w-full pt-4 border-t border-gray-300 flex justify-center gap-4 ">
        <Likes item={item} />
      </div>
    </div>


  );
};

export default MediaRow;
