import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { MediaItemWithOwner } from '../types/DBTypes';
import { useMedia } from '../hooks/apiHooks';
import Likes from './Likes';
import Comments from './Comments';

const MediaDetailPage = () => {
  const [media, setMedia] = useState<MediaItemWithOwner | undefined>();
  const { getMediaByTitle } = useMedia();
  const { title } = useParams<{ title: string }>();
  const navigate: NavigateFunction = useNavigate();

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
    {media && (
      <div className="max-w-4xl mx-auto p-4 bg-gray-300 dark:bg-slate-700 dark:text-white shadow-lg rounded-lg flex flex-col items-center m-10">
        <h3 className="text-xl font-bold mb-2 text-center">{media.title}</h3>
        <div className="w-2/3">
          {media.media_type.includes('video') ? (
            <video controls src={media.filename} className="w-full h-auto"></video>
          ) : (
            <img src={media.thumbnail} alt={media.title} className="w-full h-auto rounded" />
          )}
        </div>
        <div className="w-full flex flex-col items-center">
        <div className=" -top-6 transform translate-y-0 flex justify-center items-center w-full pb-1">
            <Likes item={media} />
        </div>
          <Comments item={media} />
        </div>
        <p className="mt-4 text-center">{media.description}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
          Uploaded at: {new Date(media.created_at).toLocaleString('fi-FI')}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Size: {media.filesize}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">Type: {media.media_type}</p>
        <button
          onClick={() => {
            navigate('/')
          }}
          className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
        >
          Go Back
        </button>
      </div>
    )}
  </>

  );
};

export default MediaDetailPage;
