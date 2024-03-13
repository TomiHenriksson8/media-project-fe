import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearch } from '../hooks/apiHooks';

import { SearchResults } from '../types/LocalTypes';
import SearchResultsList from './SearchResultList';



function SearchBar() {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const { searchMediaAndUsers } = useSearch();

  const fetchMediaAndUserSearchs = async (searchTerm: string) => {
    try {
      const response = await searchMediaAndUsers(searchTerm);
      if (response) {
        setSearchResults(response);
        // console.log(response)
        // console.log(searchResults);
      }
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
    if (value) {
      fetchMediaAndUserSearchs(value);
    } else {
      setSearchResults(null);
    }
  };

  return (
    <div>
      <div className='input-wrapper bg-gray-600 w-max rounded-md h-9 pl-3 pr-3 shadow-custom flex items-center'>
        <FaSearch id='search-icon' className='text-yellow-200' />
        <input className='bg-gray-600 text-yellow-100 border-none h-full text-2x1 w-max  ml-2 focus:outline-none'
               type="text"
               placeholder='Type to search..'
               value={input}
               onChange={(e) => handleChange(e.target.value)} />
      </div>
      {searchResults && (
        <SearchResultsList users={searchResults.mediaAndUsers.users} mediaItems={searchResults.mediaAndUsers.mediaItems} />
      )}
    </div>
  );
}

export default SearchBar;
