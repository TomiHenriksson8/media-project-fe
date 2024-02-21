import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MediaItem, User } from '../types/DBTypes';
import { useMedia, useUser } from '../hooks/apiHooks';

const UserDetailPage = () => {

  const [ user, setUser ] = useState<User | undefined>();
  const [posts, setPosts] = useState<MediaItem[] | undefined>([]);
  const {username} = useParams<{ username: string }>();
  const { getUserByUsername } = useUser();
  const { getMediaByUserId } = useMedia();

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


  const getUserDetails = async (username: string) => {
    try {
      const usern = await getUserByUsername(username);
      setUser(usern);
      console.log(user);
      getMediaByUser();
    } catch (e) {
      console.log('getUserDetails error', (e as Error).message);
    }
  }

  useEffect(() => {
    if (username) {
    getUserDetails(username);
    }
  }, [user] )


  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-6">Profile</h2>
      {user && (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">{user.username}</h3>
            <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
            <p className="text-gray-600"><span className="font-medium">Created:</span> {user.created_at.toString()}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {posts?.map((post) => (
                <Link to='/post' state={post}>
                <div key={post.media_id} className="bg-white rounded-lg shadow overflow-hidden max-h-55">
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-gray-600 mt-2">{post.description}</p>
                    {post.thumbnail && (
                      <img src={post.thumbnail} alt={post.title} className="mx-auto mt-4 max-w-full max-h-20"/>
                    )}
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>

        </>

      )}
    </div>
  );
}

export default UserDetailPage
