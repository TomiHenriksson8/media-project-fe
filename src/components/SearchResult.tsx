import React from 'react';
import { MediaItemSearch, UserSearch } from '../types/LocalTypes';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";

type SearchResultType = UserSearch | MediaItemSearch;

type SearchResultsListProps = {
  result: SearchResultType;
};

export const SearchResult: React.FC<SearchResultsListProps> = ({ result }) => {
  const navigate = useNavigate();
  const isUser = result.type === 'user';

  const handleResultClick = () => {
    if (isUser) {
      navigate(`/user/${result.username}`);
    } else {
      navigate(`/media/${result.title}`);
    }
  };

  return (
    <div className='search-result bg-gray-300 pt-2 pb-2 pl-5 pr-5 relative z-10 hover:bg-gray-400 cursor-pointer' onClick={handleResultClick}>
      {isUser ? (
        <>
          <FaUserAlt className="inline-block mr-3" />
          {result.username}
          
        </>
      ) : (
        <>
          <AiFillPicture className="inline-block mr-3" />
          {result.title}
        </>
      )}
    </div>
  );

};
