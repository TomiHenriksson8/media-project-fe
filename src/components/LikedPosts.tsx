import { useEffect, useState } from "react";
import { useMedia } from "../hooks/apiHooks";
import { MediaItemWithOwner } from "../types/DBTypes";
import { useUserContext } from "../hooks/ContextHooks";
import { Link } from "react-router-dom";

const LikedPosts = () => {

  const { user } = useUserContext();
  const { getLikedMedia} = useMedia();
  const [likedMedia, setLikedMedia] = useState<MediaItemWithOwner[]>([]);


  const getLikedPosts = async () => {
    if (!user) {
      return;
    }
    try {
      const likedMedia = await getLikedMedia(user.user_id);
      setLikedMedia(likedMedia);
    } catch (e) {
      console.log('get liked media error', (e as Error).message);
    }
  };

  useEffect(() => {
    getLikedPosts();
  }, [])
  // console.log(likedMedia);
   return (
    <>

    <div className="max-w-4xl mx-auto pt-1 pb-4 ">
      <h2 className="text-2xl font-bold mb-4 text-center">Liked Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {likedMedia?.map((post) => (
          <div key={post.media_id} className="bg-white rounded-lg shadow overflow-hidden max-h-55">
            <Link key={post.media_id} to='/post' state={post}>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.description}</p>
              {post.thumbnail && (
                <img src={post.thumbnail} alt={post.title} className="mx-auto mt-4 max-w-full max-h-20"/>
                )}

            </div>
          </Link>

          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default LikedPosts
