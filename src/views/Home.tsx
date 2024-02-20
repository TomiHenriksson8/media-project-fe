import MediaRow from '../components/MediaRow';
import { useMedia } from '../hooks/apiHooks';

const Home = () => {

  const {mediaArray} = useMedia();

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
