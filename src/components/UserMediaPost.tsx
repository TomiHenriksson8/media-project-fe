import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/ContextHooks";
import { useMedia } from "../hooks/apiHooks";
import { MediaItem } from "../types/DBTypes";
import { Link } from "react-router-dom";
import { AiOutlinePicture } from "react-icons/ai";


const UserMediaPost = () => {

  const { getMediaByUserId, deleteMedia } = useMedia();
  const { user } = useUserContext();

  const [posts, setPosts] = useState<MediaItem[] | undefined>([]);

  const getMediaByUser = async () => {
    if (!user) {
      return;
    }
    try {
      const media = await getMediaByUserId(user.user_id);
      setPosts(media);
      // console.log(media);
    } catch (e) {
      console.error((e as Error).message);
    }
  };


  const deleteMediaItem = async (mediaId: number) => {
    const token = localStorage.getItem('token');
    if (!token || !user) {
      return;
    }
    try {
      deleteMedia(mediaId, token);
      setPosts(currentPosts => currentPosts ? currentPosts.filter(post => post.media_id !== mediaId): []);
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  useEffect(() => {
    getMediaByUser();
  }, [user]);


  return (
    <div className="pt-1 pb-4">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Your Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts && posts.length > 0 ? ( posts?.map((post) => (
          <div key={post.media_id} className="bg-white dark:bg-slate-700 dark:text-white rounded-lg shadow overflow-hidden max-h-55">
            <Link key={post.media_id} to='/post' state={post}>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold ">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{post.description}</p>
                {post.thumbnail && (
                  <img src={post.thumbnail} alt={post.title} className="mx-auto mt-4 max-w-full max-h-20"/>
                  )}
              </div>
            </Link>
            <div className=" text-center bg-gray-100 dark:bg-slate-600">
              <button className="text-white bg-red-500 dark:bg-red-700 py-2 px-5 rounded-lg mt-3 mb-2" onClick={() => deleteMediaItem(post.media_id)}>Delete</button>
            </div>
          </div>
            ))) : (
              <div className="col-span-full flex justify-center">
                <div className="py-4 flex flex-col items-center">
                  <AiOutlinePicture className="text-9xl dark:text-gray-300 text-gray-600" />
                  <h3 className="dark:text-white text-[24px] text-center">No posts yet</h3>
                  <p className="text-center dark:text-white pt-1">Click <a href="/upload" className="font-medium hover:underline">Upload</a> on the navigation bar to make your first post.</p>
                </div>
              </div>
        )}
      </div>
    </div>
  );

}

export default UserMediaPost
