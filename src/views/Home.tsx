import { useEffect, useState } from 'react';
import MediaRow from '../components/MediaRow';
import { useMedia } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/ContextHooks';

const Home = () => {

  const {mediaArray, followedMediaArray, getMediaFromFollowed} = useMedia();
  const { user } = useUserContext();
  const [page, setPage] = useState(true);

  useEffect(() => {
    if (user) {
      getMediaFromFollowed(user.user_id);
    }
  }, [user])

  console.log(followedMediaArray);

  const baseButtonClass = 'bg-sky-200 hover:bg-sky-300 text-black p-3 font-medium transition duration-200 ease-out rounded-lg shadow-sl';

  const forYouButtonClass = `${baseButtonClass} ${page ? 'bg-sky-400' : ''}`;
  const followingButtonClass = `${baseButtonClass} ${!page ? 'bg-sky-400' : ''}`;

  return (
    <>
      <div className='flex flex-col space-y-[2px] pt-[2px]'>
        <button className={forYouButtonClass} onClick={() => setPage(true)}>For You</button>
        <button className={followingButtonClass} onClick={() => setPage(false)}>Following</button>
      </div>
        {page ? (
        <div className="media-container flex flex-col items-center p-10">
          {mediaArray.map((item) => (
              <MediaRow
                key={item.media_id}
                item={item}
              />
            ))}
        </div>
      ) : (
        <div className='media-container flex flex-col items-center p-10'>
          {followedMediaArray.map((item) =>  (
            <MediaRow
              key={item.media_id}
              item={item}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
