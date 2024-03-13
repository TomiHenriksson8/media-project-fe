import { SearchResult } from './SearchResult';
import { mediaAndUsers } from '../types/LocalTypes';



const SearchResultsList = ({ users, mediaItems }: mediaAndUsers) => {

  // console.log('Users:', users);
  // console.log('MediaItems:', mediaItems);

  const combinedResults = [
    ...(users ?? []).map(user => ({ ...user, type: 'user' as const })),
    ...(mediaItems ?? []).map(mediaItem => ({ ...mediaItem, type: 'mediaItem' as const }))
  ];

  // console.log(combinedResults);

  return (
    <div className='results-list absolute z-10 w-60 flex flex-col shadow-custom rounded-lg mt-1 max-h-72 overflow-y-scroll'>
      {combinedResults.map((result, index) => (
        <SearchResult result={result} key={index} />
      ))}
    </div>
  );
};

export default SearchResultsList;
