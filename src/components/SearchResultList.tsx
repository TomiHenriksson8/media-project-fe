import { SearchResult } from './SearchResult';

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
    };
    phone: string;
    website: string;
    company: {
      name: string;
    };
  };

type SearchResultsListProps = {
    results: User[];
  };

  const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
    return (
      <div className='results-list absolute z-10 w-80 flex flex-col shadow-custom rounded-lg mt-1 max-h-72 overflow-y-scroll'>
          {results.map((result, id: number) => {
              return <SearchResult result={result} key={id} />
          })}
      </div>
    );
  };

export default SearchResultsList
