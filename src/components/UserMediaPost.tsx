import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/ContextHooks";
import { useMedia } from "../hooks/apiHooks";
import { MediaItem } from "../types/DBTypes";



const UserMediaPost = () => {

  const { getMediaByUserId } = useMedia();
  const { user } = useUserContext();

  const [posts, setPosts] = useState<MediaItem[] | undefined>([]);

  const getMediaByUser = async () => {
    if (!user) {
      return;
    }
    try {
      const media = await getMediaByUserId(user.user_id);
      setPosts(media);
      console.log(media);
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  useEffect(() => {
    getMediaByUser();
  }, [user]);


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts?.map((post) => (
          <div key={post.media_id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.description}</p>
              {post.thumbnail && (
                <img src={post.thumbnail} alt={post.title} className="mx-auto mt-4 max-w-full h-auto"/>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default UserMediaPost
