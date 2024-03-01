import { useEffect } from 'react';
import MediaRow from '../components/MediaRow';
import { useMedia } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/ContextHooks';

const Home = () => {

  const {mediaArray, followedMediaArray, getMediaFromFollowed} = useMedia();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      getMediaFromFollowed(user.user_id);
    }
  }, [user])

  console.log(followedMediaArray);

  return (
    <>
      <div className="media-container flex flex-col items-center p-2">
        {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
