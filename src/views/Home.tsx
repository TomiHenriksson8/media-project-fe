import {MediaItem, MediaItemWithOwner, User} from '../types/DBTypes';
/* import MediaRow from '../components/MediaRow'; */
import {useEffect, useState} from 'react';
import {fetchData} from '../lib/functions';
/* import MediaRow from './MediaRow'; // Ensure this component is compatible with the data structure */

import MediaRow from '../components/MediaRow';

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  //console.log(mediaArray);

  const getMedia = async () => {
    try {
      const mediaItems = await fetchData<MediaItem[]>(import.meta.env.VITE_MEDIA_API + '/media');
      // Get usernames (file owners) for all media files from auth api
      const itemsWithOwner: MediaItemWithOwner[] = await Promise.all(mediaItems.map(async (item) => {
        const owner = await fetchData<User>(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
        const itemWithOwner: MediaItemWithOwner = {...item, username: owner.username};
        return itemWithOwner;
      }));
      setMediaArray(itemsWithOwner);
      console.log('mediaArray updated:', itemsWithOwner);
    } catch (error) {
      console.error('getMedia failed', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

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
