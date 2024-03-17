import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { MediaItemWithOwner } from "../types/DBTypes";
import Likes from "../components/Likes";
import Comments from "../components/Comments";


const Post = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const item: MediaItemWithOwner = state;



  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-slate-700 dark:text-white shadow-lg rounded-lg flex flex-col items-center m-10">
      <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>
      <div className="w-2/3 mb-4">
        {item.media_type.includes('video') ? (
          <video controls src={item.filename} className="w-full h-auto"></video>
        ) : (
          <img src={item.thumbnail} alt={item.title} className="w-full h-auto rounded" />
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <div className=" -top-6 transform translate-y-0 flex justify-center items-center w-full pb-1">
            <Likes item={item} />
        </div>
        <Comments item={item} />
      </div>
      <p className="mt-4 text-center">{item.description}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">Uploaded at: {new Date(item.created_at).toLocaleString('fi-FI')}, by: {item.username}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Size: {item.filesize}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">Type: {item.media_type}</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
      >
        Go Back
      </button>
    </div>
  );
};

export default Post;
