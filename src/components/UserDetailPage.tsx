import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MediaItem, User} from '../types/DBTypes';
import { useMedia, useUser } from '../hooks/apiHooks';
import Follow from './Follow';
import FollowingFollowers from './FollowingFollowers';
import { useUserContext } from '../hooks/ContextHooks';
import { MdOutlinePermMedia } from "react-icons/md";


const UserDetailPage = () => {

  const [ user, setUser ] = useState<User | undefined>();
  const [posts, setPosts] = useState<MediaItem[] | undefined>([]);
  const [followStatusChanged, setFollowStatusChanged] = useState(false);
  const {username} = useParams<{ username: string }>();
  const { getUserByUsername } = useUser();
  const { user: currentUser } = useUserContext();
  const { getMediaByUserId } = useMedia();

  const getUserDetails = async (username: string) => {
    try {
      const userDetails = await getUserByUsername(username);
      setUser(userDetails);
      if (userDetails) {
        getMediaByUser(userDetails.user_id);
      }
    } catch (e) {
      console.error('getUserDetails error', e);
    }
  };

  const getMediaByUser = async (userId: number) => {
    try {
      const media = await getMediaByUserId(userId);
      setPosts(media);
    } catch (e) {
      console.error('getMediaByUser error', e);
    }
  };

  const handleFollowStatusChange = () => {
    setFollowStatusChanged((prev) => !prev);
  };

  useEffect(() => {
    if (username) {
      getUserDetails(username);
    }
  }, [username]);


  return (
        <div className="max-w-4xl mx-auto p-5">
          <h2 className="text-lg font-bold text-left mb-3 ml-3">Profile</h2>
          {user && (
            <>
              <div className="bg-white shadow-md rounded-lg px-3 py-6 md:px-6 mb-6 ">
              <div className="flex flex-row justify-between">
                <img src='../blank-pfp.png' alt={user.username} className="w-16 h-16  rounded-full border border-gray-400 border-solid"/>
                <h3 className=" font-bold mb-4  text-[23px]  mt-4">{user.username}</h3>
                {currentUser && currentUser.user_id !== user.user_id ? (
                  <Follow user={user} onFollowStatusChange={handleFollowStatusChange} />
                ) : (
                  null
                )}
              </div>
                <FollowingFollowers user={user} followStatusChanged={followStatusChanged} />
                <p className="text-gray-600 pt-4"><span className="font-medium">Created:</span> {new Date(user.created_at).toLocaleString('fi-FI')}</p>

              </div>
          <div>
            <h2 className=" text-[26px] md:text-[33px] font-bold mb-4 text-center">Posts :</h2>
            <div className={`${posts && posts.length > 0 ? 'grid grid-cols-1 sm:grid-cols-3 gap-4' : 'flex justify-center items-center'}`}>
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Link key={post.media_id} to='/post' state={post}>
                    <div className="bg-white rounded-lg shadow overflow-hidden max-h-55">
                      <div className="p-4 text-center">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-gray-600 mt-2">{post.description}</p>
                        {post.thumbnail && (
                          <img src={post.thumbnail} alt={post.title} className="mx-auto mt-4 max-w-full max-h-20"/>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className='flex flex-col gap-6 py-5'>
                  <div className="text-center text-[18px] md:text-[22px] font-semibold w-full">This is user got no Posts</div>
                  <MdOutlinePermMedia className=' text-[88px] md:text-[122px] w-full text-center mb-20' />
                </div>
              )}
            </div>
          </div>

        </>

      )}
    </div>
  );
}

export default UserDetailPage
