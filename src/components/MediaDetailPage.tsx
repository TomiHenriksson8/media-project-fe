import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MediaItemWithOwner } from '../types/DBTypes';
import { useMedia } from '../hooks/apiHooks';
import Likes from './Likes';
import Comments from './Comments';

const MediaDetailPage = () => {
  const [media, setMedia] = useState<MediaItemWithOwner | undefined>();
  const { getMediaByTitle } = useMedia();
  const { title } = useParams<{ title: string }>();

  const getMediaDetails = async (title: string) => {
    try {
      const mediaItem = await getMediaByTitle(title);
      console.log(mediaItem);
      if (mediaItem) {
        setMedia(mediaItem);
      }
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  useEffect(() => {
    if (title) {
      getMediaDetails(title);
    }
  }, [title]); // Dependency is the title, not the media

  // When rendering, check if media is defined and has at least one item
  return (
    <>
      {media &&  (
        <div key={media.media_id} className="bg-white rounded-lg shadow overflow-hidden max-h-55">
          <div className="p-4 text-center">
            <h3 className="text-xl font-semibold">{media.title}</h3>
            <p className="text-gray-600 mt-2">{media.description}</p>
            {media.thumbnail && (
              <img src={media.thumbnail} alt={media.title} className="mx-auto mt-4 max-w-full max-h-20" />
            )}
          </div>
          <div className="comment-like-container flex flex-row gap-2">
          <Likes  item={media}/>
          <Comments item={media}/>
      </div>
        </div>
      )}
    </>
  );
};

export default MediaDetailPage;
